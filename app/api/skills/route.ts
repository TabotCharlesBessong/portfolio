import { NextResponse } from "next/server";
import Skill from "@/models/Skill";
import { connectToDatabase } from "@/lib/mongodb";

// GET: Fetch Skills with Searching, Filtering, Sorting, and Pagination
export async function GET(req: Request) {
  try {
    const db = await connectToDatabase();
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const sort = url.searchParams.get("sort") || "name";
    const order = url.searchParams.get("order") === "desc" ? -1 : 1;
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    const query = search ? { name: { $regex: search, $options: "i" } } : {};
    const total = await Skill.countDocuments(query);
    const skills = await Skill.find(query)
      .sort({ [sort]: order })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ total, skills });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// POST: Add a new Skill
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();
    const skill = new Skill(body);
    await skill.save();
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add skill" }, { status: 500 });
  }
}

// PUT: Update an existing Skill
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();
    const { id, ...updates } = body;

    const skill = await Skill.findByIdAndUpdate(id, updates, { new: true });
    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a Skill
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Skill ID is required" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Skill deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}
