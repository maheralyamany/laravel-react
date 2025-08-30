<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProvinceStoreRequest;
use App\Http\Requests\ProvinceUpdateRequest;
use App\Models\Province;
use App\Services\Province\ProvinceService;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ProvinceController extends Controller
{
    use AuthorizesRequests;
    public function __construct(
        private ProvinceService $service
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        //
        $this->authorize('viewAny', Province::class);

        $search = $request->query('search');

        $provinces = $this->service->getProvinces(
            search: $search
        );
        //  dd($provinces);
        return Inertia::render('provinces/index', [
            'provinces' => $provinces,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create', Province::class);

        return Inertia::render('provinces/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProvinceStoreRequest $storeRequest): RedirectResponse
    {
        $this->authorize('create', Province::class);

        $this->service->create($storeRequest->validated());

        return redirect()
            ->route('provinces.index')
            ->with('success', __('provinces.messages.created'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Province $province): Response
    {
        $this->authorize('view', $province);

        return Inertia::render('provinces/show', [
            'province' => $province,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Province $province): Response
    {
        $this->authorize('update', $province);

        return Inertia::render('provinces/edit', [
            'province' => $province,

        ]);
    }

    /**
     * Update the specified resource in storage.
     */


    public function update(ProvinceUpdateRequest $updateRequest,  Province $province): RedirectResponse
    {
        $this->authorize('update', $province);

        $res = $this->service->update($province, $updateRequest->validated());


        if ($res)
            return redirect()
                ->route('provinces.index')
                ->with('success', __('provinces.messages.updated'));
        return back()->with('error', __('provinces.messages.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Province $province)
    {
        $this->authorize('delete', $province);

        $this->service->delete($province);

        return redirect()->route('provinces.index')
            ->with('success', __('provinces.messages.deleted'));
    }
    public function restore(Province $province): RedirectResponse
    {
        $this->authorize('restore', $province);

        $this->service->restore($province);

        return redirect()->route('provinces.index')
            ->with('success', __('provinces.messages.restored'));
    }
}
