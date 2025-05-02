<?php

namespace App\Http\Controllers;

use App\Models\SuKien;
use Illuminate\Http\Request;

class SuKienController extends Controller
{
    public function getChiTietSuKien($id)
    {
        $data = SuKien::find($id);
        
        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy sự kiện'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }
} 