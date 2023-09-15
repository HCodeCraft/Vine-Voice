# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!([{
  username: "HarvestDreamer",
  name: "Hanna"
  password: "Kcc9g5f_Dc3h%-1K",
  avatar_url: "https://i.pinimg.com/originals/c8/6f/8a/c86f8a7ecda86bf1021e56334557d4cc.jpg",
  image: "",
  privacy: false,
  email:"hcodecraft@gmail.com",
  recieve_dev_emails: true,
  status: "Coding like a boss 💚 💪",
  admin: true

}])