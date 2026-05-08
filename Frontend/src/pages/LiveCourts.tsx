import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Court, TournamentMatch } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Activity, Plus, CheckCircle2 } from "lucide-react";

export default function LiveCourts() {
  const queryClient = useQueryClient();
  const [newCourtName, setNewCourtName] = useState("");

  const { data: courts, isLoading: courtsLoading } = useQuery<Court[]>({
    queryKey: ["courts"],
    queryFn: api.courts.list,
    refetchInterval: 3000,
  });

  const { data: queue, isLoading: queueLoading } = useQuery<TournamentMatch[]>({
    queryKey: ["queue"],
    queryFn: api.courts.getQueue,
    refetchInterval: 3000,
  });

  const createCourtMutation = useMutation({
    mutationFn: api.courts.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courts"] });
      setNewCourtName("");
    },
  });

  const assignMatchMutation = useMutation({
    mutationFn: ({ courtId, matchId }: { courtId: string; matchId: string }) => api.courts.assignMatch(courtId, matchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courts"] });
      queryClient.invalidateQueries({ queryKey: ["queue"] });
    },
  });

  const freeCourtMutation = useMutation({
    mutationFn: api.courts.freeCourt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courts"] });
    },
  });

  const handleCreateCourt = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourtName) createCourtMutation.mutate(newCourtName);
  };

  const idleCourts = courts?.filter(c => c.status === 'Idle') || [];

  const getEntrantName = (entrantOrId: any) => {
    if (!entrantOrId) return "TBD";
    return typeof entrantOrId === 'object' ? entrantOrId.name : entrantOrId;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Live Courts & Queue</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" /> Active Courts
            </h2>
            <form onSubmit={handleCreateCourt} className="flex gap-2">
              <Input 
                placeholder="New court name..." 
                value={newCourtName} 
                onChange={e => setNewCourtName(e.target.value)}
                className="w-48"
              />
              <Button type="submit" disabled={createCourtMutation.isPending || !newCourtName} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {courtsLoading ? <div>Loading courts...</div> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courts?.map(court => (
                <Card key={court._id} className={`border-2 ${court.status === 'In Use' ? 'border-primary' : 'border-muted'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{court.name}</CardTitle>
                      <Badge variant={court.status === 'In Use' ? 'default' : 'secondary'}>{court.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {court.status === 'In Use' && court.currentMatchId ? (
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground font-medium">
                          {(court.currentMatchId as any).tournamentId?.name} • Round {(court.currentMatchId as any).round}
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                           <div className="p-2 bg-muted rounded flex justify-between">
                              <span>{getEntrantName((court.currentMatchId as any).entrant1Id)}</span>
                           </div>
                           <div className="p-2 bg-muted rounded flex justify-between">
                              <span>{getEntrantName((court.currentMatchId as any).entrant2Id)}</span>
                           </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted-foreground text-sm italic py-4">Court is empty</div>
                    )}
                  </CardContent>
                  <CardFooter>
                    {court.status === 'In Use' && (
                       <Button variant="outline" className="w-full text-red-500 hover:text-red-600" onClick={() => freeCourtMutation.mutate(court._id)}>
                          Free Court
                       </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">Match Queue</h2>
          
          <Card className="bg-muted/30">
            <CardContent className="p-4 flex flex-col gap-3 min-h-[400px] max-h-[800px] overflow-y-auto">
              {queueLoading ? <div>Loading queue...</div> : queue?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground italic">Queue is empty</div>
              ) : (
                queue?.map(match => (
                  <Card key={match._id} className="w-full shadow-sm">
                    <CardContent className="p-3">
                      <div className="text-xs font-semibold text-muted-foreground mb-2">
                         {(match as any).tournamentId?.name} • Round {match.round}
                      </div>
                      <div className="flex flex-col gap-1 mb-3">
                         <div className="text-sm px-2 py-1 bg-muted rounded truncate">
                            {getEntrantName(match.entrant1Id)}
                         </div>
                         <div className="text-sm px-2 py-1 bg-muted rounded truncate">
                            {getEntrantName(match.entrant2Id)}
                         </div>
                      </div>
                      
                      {idleCourts.length > 0 ? (
                        <div className="flex gap-2">
                          <select 
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            id={`court-select-${match._id}`}
                          >
                            {idleCourts.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                          </select>
                          <Button 
                            size="sm" 
                            onClick={() => {
                              const select = document.getElementById(`court-select-${match._id}`) as HTMLSelectElement;
                              if (select && select.value) {
                                assignMatchMutation.mutate({ courtId: select.value, matchId: match._id });
                              }
                            }}
                          >
                            Assign
                          </Button>
                        </div>
                      ) : (
                        <div className="text-xs text-amber-500 font-medium">No idle courts available</div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
