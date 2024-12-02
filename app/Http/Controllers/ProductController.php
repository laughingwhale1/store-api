<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\Product\ProductRequest;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{

    public function index(): JsonResponse
    {
        $search = request('search', '');
        $perPage = request('per_page', 10);
        $orderBy = request('order_by', 'desc');

        $productsList = $productsList = Product::query()
            ->where('title', 'like', "%{$search}%")
            ->orWhere('description', 'like', "%{$search}%")
            ->orderBy('updated_at', $orderBy)
            ->paginate($perPage);

        $data = ProductListResource::collection($productsList->items());

        if (count($data) > 0) {
            $result = new ApiResponse(['data' => $data, 'totalCount' => $productsList->total()], true, 200, []);
             return response()->json($result->buildResponse(), 200);
        } else {
            $result = new ApiResponse(null, true, 404, []);
             return response()->json($result->buildResponse(), 404);
        }
    }

    public function store(ProductRequest $request): ProductResource
    {
        return new ProductResource(
            Product::create($request->validated())
        );
    }

    public function show(Product $product): ProductResource
    {
        return new ProductResource($product);
    }

    public function update(ProductRequest $request, Product $product): ProductResource
    {
        $product->update($request->validated());

        return new ProductResource($product);
    }

    public function destroy(Product $product): \Illuminate\Http\JsonResponse
    {
        $product->delete();

        $res = new ApiResponse(null, true, 204, []);
        return response()->json($res->buildResponse(), 204);
    }
}
