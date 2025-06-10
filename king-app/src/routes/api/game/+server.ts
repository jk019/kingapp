import { json } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";
import type { RequestEvent } from '@sveltejs/kit';




export async function POST(event: RequestEvent) {
    const { request } = event;
    const body = await request.json();

    const { id_player_one, id_player_two, score_player_one, score_player_two, kinggame } = body;

    const { error } = await supabase.from("Game").insert([
        {
            id_player_one,
            id_player_two,
            score_player_one,
            score_player_two,
            kinggame
        }
    ]);

    if (error) {
        return json({ success: false, error: error.message }, { status: 500 });
    }
    return json({ success: true });

}

export async function GET() {
	const { data, error } = await supabase.from("Game").select("*");

	if (error) {
		return json({ success: false, error: error.message }, { status: 500 });
	}

	return json({ success: true, data });
}
