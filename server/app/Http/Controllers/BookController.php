<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Book;
use League\Csv\XMLConverter;
use League\Csv\Writer;
use SplTempFileObject;


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
        $booksQuery = Book::query();
        if ($sortColumn && $sortOrder) {
            $booksQuery->orderBy($sortColumn, $sortOrder);
        }
        if ($searchKey && $searchField) {
            $booksQuery->where($searchField, 'like', "%$searchKey%");
        }
        $paginatedBooks = $booksQuery->paginate(10);
        return response()->json($paginatedBooks);
    }
    public function show(Book $book)
    {
        return response()->json($book);
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

    public function exportAsCsvAndXml(Request $request)
    {
        $type = $request->query('type');
        $columns = $request->query('columns');
        $books = Book::all();

        switch ($type) {
            case 'csv':
                $data = [];
                if ($columns === 'title') {
                    $data[] = ['title'];
                }

                if ($columns === 'author') {
                    $data[] = ['author'];
                }

                if ($columns === 'both') {
                    $data[] = ['title', 'author'];
                }

                foreach ($books as $book) {
                    $rowData = [];

                    if ($columns === 'title' || $columns === 'both') {
                        $rowData[] = $book->title;
                    }

                    if ($columns === 'author' || $columns === 'both') {
                        $rowData[] = $book->author;
                    }

                    $data[] = $rowData;
                }

                $csv = \League\Csv\Writer::createFromFileObject(new \SplTempFileObject);
                $csv->insertAll($data);

                return response((string) $csv, 200)
                    ->header('Content-Type', 'text/csv')
                    ->header('Content-Disposition', 'attachment; filename="books.csv"');
            case 'xml':
                $xml = new \SimpleXMLElement('<books></books>');

                foreach ($books as $book) {
                    $bookElement = $xml->addChild('book');

                    if ($columns === 'title' || $columns === 'both') {
                        $bookElement->addChild('title', $book->title);
                    }

                    if ($columns === 'author' || $columns === 'both') {
                        $bookElement->addChild('author', $book->author);
                    }
                }

                $response = response($xml->asXML(), 200);
                $response->header('Content-Type', 'application/xml');
                $response->header('Content-Disposition', 'attachment; filename=books.xml');

                return $response;

            default:
                return response('Invalid export type', 400);
        }
    }


}