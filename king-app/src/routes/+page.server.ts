import { supabase } from "$lib/supabaseClient";
import { fail } from "@sveltejs/kit";


export async function load() {
  // Spieler abrufen
  const { data: players, error: playerError } = await supabase
    .from("Player")
    .select();

  // Kinggames abrufen mit Spieler-Infos
  const { data: kinggames, error: gameError } = await supabase
    .from("Game")
    .select(`
      *,
      player_one: id_player_one ( id, name ),
      player_two: id_player_two ( id, name )
    `)
    .eq("kinggame", true)
    .order("created_at", { ascending: false })
    .limit(10);

 // get current king
  const { data: currentking, error: kingerror } = await supabase
    .from("Game")
    .select(`
      score_player_one,
      score_player_two,
      PlayerOne: id_player_one (id, name),
      PlayerTwo: id_player_two (id, name)
    `)
    .eq("kinggame", true)
    .order("created_at", { ascending: false })
    .limit(1);

  let kingName = null;
  if (currentking && currentking.length > 0) {
    const game = currentking[0];
    if (game.score_player_one > game.score_player_two) {
      kingName = game.PlayerOne?.name ?? null;
    } else if (game.score_player_two > game.score_player_one) {
      kingName = game.PlayerTwo?.name ?? null;
    }
  }

  if (playerError || gameError || kingerror) {
    console.error("Fehler beim Abrufen:", playerError ?? gameError ?? kingerror);
    return {
      Player: [],
      PreviousMatches: [],
      King: null
    };
  }

  return {
    Player: players ?? [],
    PreviousMatches: kinggames ?? [],
    King: kingName  // <-- hier nur der Name als String
  };


}




