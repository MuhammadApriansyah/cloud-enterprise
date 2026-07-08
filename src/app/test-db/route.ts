import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Mencoba melakukan query sederhana ke database
    const { data, error } = await supabase.from('access_tokens').select('id').limit(1);

    if (error) {
      return NextResponse.json({ status: "Error", message: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: "Success", data });
  } catch (err) {
    return NextResponse.json({ status: "Exception", message: String(err) }, { status: 500 });
  }
}

