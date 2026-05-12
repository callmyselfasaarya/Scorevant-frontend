import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Tournament } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";
import { Plus, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTransition } from "@/components/MotionWrappers";

export default function Tournaments() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [sportType, setSportType] = useState("Tennis");
  const [entrantsText, setEntrantsText] = useState("");

  const { data: tournaments, isLoading } = useQuery<Tournament[]>({
    queryKey: ["tournaments"],
    queryFn: api.tournaments.list,
  });

  const createMutation = useMutation({
    mutationFn: api.tournaments.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
      setName("");
      setEntrantsText("");
    },
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const entrantsList = entrantsText
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map((name, index) => ({ name, seed: index + 1 }));

    createMutation.mutate({
      name,
      sportType,
      maxSets: sportType === "Badminton" ? 3 : sportType === "Tennis" ? 3 : 5, // Example default
      entrants: entrantsList,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tournaments</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>New Tournament</CardTitle>
              <CardDescription>Create a new single-elimination tournament.</CardDescription>
            </CardHeader>
            <form onSubmit={handleCreate}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Name</label>
                  <Input 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="e.g. Summer Open 2026" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Sport Type</label>
                  <Select value={sportType} onValueChange={setSportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Badminton">Badminton</SelectItem>
                      <SelectItem value="Tennis">Tennis</SelectItem>
                      <SelectItem value="Table Tennis">Table Tennis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Entrants (1 per line)</label>
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={entrantsText}
                    onChange={e => setEntrantsText(e.target.value)}
                    placeholder="Player 1&#10;Player 2&#10;Player 3"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={createMutation.isPending} className="w-full">
                  {createMutation.isPending ? "Creating..." : "Create Tournament"}
                  <Plus className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div className="md:col-span-2">
          {isLoading ? (
            <div>Loading tournaments...</div>
          ) : tournaments?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Trophy className="mx-auto h-12 w-12 opacity-50 mb-4" />
              <p>No tournaments found. Create one to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tournaments?.map((tournament) => (
                <Card key={tournament._id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => setLocation(`/tournaments/${tournament._id}`)}>
                  <CardHeader>
                    <CardTitle className="text-xl">{tournament.name}</CardTitle>
                    <CardDescription>{tournament.sportType} • {tournament.status}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
