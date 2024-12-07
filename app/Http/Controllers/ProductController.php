<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Helpers\ResponseHelper;
use App\Http\Requests\Product\ProductRequest;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{

    public function index()
    {
        $search = request('search', '');
        $perPage = request('per_page', 10);
        $orderBy = request('order_by', 'desc');

        $productsList = Product::query()
            ->where('title', 'like', "%{$search}%")
            ->orWhere('description', 'like', "%{$search}%")
            ->orderBy('updated_at', $orderBy)
            ->paginate($perPage);

        $data = ProductListResource::collection($productsList->items());

        if (count($data) > 0) {
            return ResponseHelper::buildResponse(
                ['data' => $data, 'totalCount' => $productsList->total()],
                true,
                Response::HTTP_OK,
                []);
        } else {
            return ResponseHelper::buildResponse(
                ['data' => [], 'totalCount' => $productsList->total()],
                true,
                Response::HTTP_OK,
                []);
        }
    }

    public function store(ProductRequest $request)
    {
        return new ProductResource(
            Product::create($request->validated())
        );
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->validated());

        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        $res = new ApiResponse(null, true, 204, []);
        return response()->json($res->buildResponse(), 204);
    }
}
