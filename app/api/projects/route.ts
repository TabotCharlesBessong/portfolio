import { NextResponse } from "next/server";
import Project from "@/models/Project";
import { connectToDatabase } from "@/lib/mongodb";

// GET: Fetch Projects with Searching, Filtering, Sorting, and Pagination
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
    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .sort({ [sort]: order })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ total, projects });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST: Add a new Project
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();
    const project = new Project(body);
    await project.save();
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add project" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing Project
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();
    const { id, ...updates } = body;

    const project = await Project.findByIdAndUpdate(id, updates, { new: true });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a Project
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
