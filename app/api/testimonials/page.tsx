import { NextResponse } from "next/server";
import Testimonial from "@/models/Testimonial";
import { connectToDatabase } from "@/lib/mongodb";

// GET: Fetch Testimonials with Searching, Filtering, Sorting, and Pagination
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
    const total = await Testimonial.countDocuments(query);
    const testimonials = await Testimonial.find(query)
      .sort({ [sort]: order })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ total, testimonials });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST: Add a new Testimonial
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();
    const testimonial = new Testimonial(body);
    await testimonial.save();
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add testimonial" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing Testimonial
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();
    const { id, ...updates } = body;

    const testimonial = await Testimonial.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!testimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a Testimonial
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
