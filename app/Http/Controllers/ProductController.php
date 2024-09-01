<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\Product\ProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ProductController extends Controller
{

    public function index()
    {
        return ProductListResource::collection(
            Product::query()->paginate(10)
        );
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
