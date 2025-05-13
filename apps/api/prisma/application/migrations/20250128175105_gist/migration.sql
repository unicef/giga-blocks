
CREATE EXTENSION btree_gist;


-- CreateIndex
CREATE INDEX "giga_school_name_idx" ON "giga_school" USING gist("name");

-- CreateIndex
CREATE INDEX "giga_school_minted_status_electricity_available_idx" ON "giga_school" USING HASH ("minted");
