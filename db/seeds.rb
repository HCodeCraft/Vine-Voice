# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!([{
  username: "OrchardDreamer",
  name: "Hanna"
  password: "Kcc9g5f_Dc3h%-1K",
  avatar_url: "",
  image: "",
  privacy: false,
  email:"hcodecraft@gmail.com",
  recieve_dev_emails: true,
  status: "Coding like a boss 💚 💪",
  admin: true

}])