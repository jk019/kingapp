// src/routes/api/king/+server.ts
import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function GET() {
	const { data, error } = await supabase
		.from('Game')
		.select(`
      score_player_one,
      score_player_two,
      player_one: id_player_one ( id, name ),
      player_two: id_player_two ( id, name )
    `)
		.eq('kinggame', true)
		.order('created_at', { ascending: false })
		.limit(1);

	if (error) {
		console.error('Fehler beim Abrufen des Kinggames:', error);
		return json({ success: false, error: error.message }, { status: 500 });
	}

	if (!data || data.length === 0) {
		// kein Spiel vorhanden
		return json({ success: true, king: null, });
	}

	const game = data[0];
	const { score_player_one, score_player_two, player_one, player_two } = game;

	let kingName: string | null = null;
	let kingID: string | null = null;

	if (score_player_one > score_player_two) {
		kingName = player_one?.name ?? null;
		kingID = player_one.id;
	} else if (score_player_two > score_player_one) {
		kingName = player_two?.name ?? null;
		kingID = player_two.id;
	}

	// Unentschieden oder keiner
	return json({ success: true, king: kingName, id: kingID });
}
