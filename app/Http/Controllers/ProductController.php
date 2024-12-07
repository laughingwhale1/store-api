<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Helpers\ResponseHelper;
use App\Http\Requests\Product\ProductRequest;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{

    public function index(): JsonResponse
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

    public function store(ProductRequest $request, Product $product)
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = $request->user()->id;

        /** @var UploadedFile $image */
        $image = $data['image'] ?? null;

        if ($image) {
            $relativePath = $this->saveImage($image);
            $data['image'] = URL::to(Storage::url($relativePath));
            $data['image_mime'] = $image->getClientMimeType();
            $data['image_size'] = $image->getSize();

            // If there is an old image, delete it
            if ($product->image) {
                Storage::deleteDirectory('/public/' . dirname($product->image));
            }
        }

        $product = Product::create($data);

        return ResponseHelper::buildResponse(
            new ProductResource($product),
            true,
            Response::HTTP_CREATED,
            []
        );
    }

    public function show(Product $product): ProductResource
    {
        return new ProductResource($product);
    }

    public function update(ProductRequest $request, Product $product): JsonResponse
    {
        $data = $request->validated();
        $data['updated_by'] = $request->user()->id;

        /** @var UploadedFile $image */
        $image = $data['image'] ?? null;

        if ($image){
            $relativePath = $this->saveImage($image);
            $data['image'] = URL::to(Storage::url($relativePath));
            $data['image_mime'] = $image->getClientMimeType();
            $data['image_size'] = $image->getSize();

            if ($product->image){
                $dir = dirname($image);
                $parsedUrl = parse_url($dir);
                $path = $parsedUrl['path'];
                $path = ltrim($path, '/');
                $path = str_replace('images/', '', $path);
                Storage::deleteDirectory('/public/' . $path);
            }
        }

        $product->update($data);

        return ResponseHelper::buildResponse(
            new ProductResource($product),
            true,
            Response::HTTP_OK,
            []
        );
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return ResponseHelper::buildResponse(
            null,
            true,
            Response::HTTP_NO_CONTENT,
            []
        );
    }

    private function saveImage(UploadedFile $image): string
    {
        $path = 'images/' . Str::random();
        if (!Storage::exists($path)) {
            Storage::makeDirectory($path, 0755, true);
        }
        if (!Storage::putFileAS('public/' . $path, $image, $image->getClientOriginalName())) {
            throw new \Exception("Unable to save file \"{$image->getClientOriginalName()}\"");
        }

        return $path . '/' . $image->getClientOriginalName();
    }

}
