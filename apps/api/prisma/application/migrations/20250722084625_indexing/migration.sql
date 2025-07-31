-- CreateIndex
CREATE INDEX "idx_school_giga_maps_water_availability" ON "giga_school" USING GIN ("giga_maps_data");

-- CreateIndex
CREATE INDEX "idx_school_giga_maps_num_teachers" ON "giga_school" USING GIN ("giga_maps_data");

-- CreateIndex
CREATE INDEX "idx_school_giga_maps_num_students" ON "giga_school" USING GIN ("giga_maps_data");

-- CreateIndex
CREATE INDEX "idx_school_giga_maps_num_computers" ON "giga_school" USING GIN ("giga_maps_data");

-- CreateIndex
CREATE INDEX "idx_school_giga_maps_download_speed" ON "giga_school" USING GIN ("giga_maps_data");

-- CreateIndex
CREATE INDEX "idx_school_giga_maps_connectivity_type" ON "giga_school" USING GIN ("giga_maps_data");
