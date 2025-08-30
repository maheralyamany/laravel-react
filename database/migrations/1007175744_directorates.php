<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('directorates')) {
            Schema::create('directorates', function (Blueprint $table) {
                $table->id();
                $table->string('name_ar', 255)->comment("الاسم عربي");
                $table->string('name_en', 255)->nullable()->comment("الاسم إنجليزي");

                $table->unsignedBigInteger('prov_id');

                $table->enum('status', ['0', '1'])->default('1')->comment("يعمل/موقف");
                $table->enum('prov_capital', ['0', '1'])->default('0')->comment("عاصمة المحافظة");
                $table->timestamps();
                $table->softDeletes();
                $table->foreign('prov_id')->references('id')->on('provinces')->onDelete('restrict')->onUpdate('cascade');
                $table->comment('المديريات');
            });
        }
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('directorates');
    }
};
