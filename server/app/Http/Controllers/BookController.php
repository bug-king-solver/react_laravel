<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Book;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $sortColumn = $request->query('sortColumn');
        $sortOrder = $request->query('sortOrder');
        $searchKey = $request->query('searchKey');
        $searchField = $request->query('searchField');
        $currentId = $request->query('currentId');
        $booksQuery = Book::query();
        if ($currentId) {
            $book = Book::find($currentId);
            return response()->json($book);
        }
        if ($sortColumn && $sortOrder) {
            $booksQuery->orderBy($sortColumn, $sortOrder);
        }
        if ($searchKey && $searchField) {
            $booksQuery->where($searchField, 'like', "%$searchKey%");
        }
        $paginatedBooks = $booksQuery->paginate(10);
        return response()->json($paginatedBooks);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $book = Book::create($request->all());
            return response()->json($book, 201);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'body' => 'required|string|max:255',
        ], [
            'title.required' => 'The title is required.',
            'title.max' => 'The title must not exceed 255 characters.',
            'author.required' => 'The author is required.',
            'author.max' => 'The author must not exceed 255 characters.',
            'body.required' => 'The body is required.',
            'body.max' => 'The body must not exceed 255 characters.',
        ]);
        $book->title = $request->title;
        $book->author = $request->author;
        $book->body = $request->body;
        $book->status = $request->status;
        $book->save();
        return response()->json($book, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Book::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}