# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_10_06_171259) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string "text"
    t.integer "user_id"
    t.integer "entry_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "entries", force: :cascade do |t|
    t.string "nickname"
    t.string "location"
    t.string "notes"
    t.string "image"
    t.integer "user_id"
    t.integer "plant_id"
    t.integer "health"
    t.string "problems", default: [], array: true
    t.boolean "open_to_advice"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "plants", force: :cascade do |t|
    t.string "common_name"
    t.string "scientific_name"
    t.string "image_url"
    t.string "description"
    t.string "water_rec"
    t.string "sunlight", array: true
    t.boolean "indoor"
    t.string "cycle"
    t.boolean "poisonous_to_humans"
    t.boolean "edible"
    t.boolean "medicinal"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "poisonous_to_pets"
    t.string "med_image_url"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "name"
    t.string "avatar_url"
    t.string "image"
    t.string "password"
    t.boolean "privacy"
    t.string "email"
    t.boolean "recieve_dev_emails"
    t.string "status"
    t.boolean "admin"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
  end

end
