# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Plant.create!([{
#   common_name: "golden pothos",
#   scientific_name: "Epipremnum aureum",
  
#   image_url: "https://perenual.com/storage/species_image/2773_epipremnum_aureum/small/2560px-Epipremnum_aureum_31082012.jpg",
#   description: "Golden Pothos, also known as Epipremnum aureum, is an amazing, easy-care houseplant that is both aesthetically pleasing and resilient. The attractive variegated leaves of the plant grow rapidly and are easy to care for, making it a popular choice for beginners. Its glossy leaves drape gracefully in looping trails making it perfect for hanging baskets, wall mount containers, and table displays. The plant is also known to reduce various volatile organic compounds (VOCs) in the air that can be toxic, and can also help reduce snoring in bedrooms. Its natural resilience and ease of care makes the Golden Pothos a great choice for any plant lover, from beginner to advanced!",
#   water_rec: "Average",
#   sunlight: "part sun/part shade",
#   indoor: 1,
#   cycle: "Perennial",
#   poisonous_to_pets: 1,
#   poisonous_to_humans: 0,
#   edible: 0, 
#   medicinal: 0
# }, {
#   common_name: "velvet plant",
#   scientific_name: "Gynura aurantiaca",
#   image_url: "",
#   description: "The Velvet Plant (Gynura aurantiaca) is truly an amazing species of plant! It features large, glossy, velvety leaves that contrast strikingly with its bright purple veins--a real eye-catcher! It’s easy to care for and can tolerate both low and high light conditions, allowing it to thrive in most environments. It’s a great air purifier, removing toxins like formaldehyde, benzene, and xylene from the air. It also produces oxygen, creating fresher, better quality air indoors. Finally, the Velvet Plant creates an attractive, lush backdrop for other plants, making it a great addition to any plant collection.",
#   water_rec: "Average",
#   sunlight: "full sun/part shade",
#   indoor: 1,
#   cycle: "Herbaceous Perennial",
#   poisonous_to_pets: 0,
#   poisonous_to_humans: 0, 
#   edible: 0, 
#   medicinal: 1
# },
# {
#   common_name: "Tradiscantia 'White Zebra'",
#   scientific_name: "Tradescantia fluminensis 'Albovittata'",
#   image_url: "https://i.etsystatic.com/28032647/r/il/3ba956/3031288944/il_1588xN.3031288944_1bts.jpg",
#   description: "It is commonly called Giant White Inch Plant. Tradescantia fluminensis is native from the regions of Brazil to northern Argentina, and is an evergreen trailing plant that roots at the nodes as it grows along the ground, forming an attractive groundcover or hanging plant. It is a fast grower and can be easily grown indoors in pots or baskets. Giant White Inch Plant has ovular, fleshy, pointed green and white variegated leaves that measure up to 2.5 inches long. Its foliage usually grows to 6 inches in length, but can spread up to two feet wide or more if allowed to do so. In hanging display, the stems of the Giant White Inch Plant will sprawl downward. Small, three-petaled, white blooms can appear throughout the year, but flowers infrequently appear on plants permanently kept indoors. The leaf nodes along its stems are purportedly one inch apart, hence the common name 'Inch Plant'.Tradescantia are climbing or trailing plants which will thrive indoors in good light. They are also known by other names: spider-lily, cradle-lily, oyster-plant and flowering inch plant. The stems trail to about 60cm or more.",
#   water_rec: "Frequent",
#   sunlight: [
#     "full sun",
#     "part shade"
#   ],
#   indoor: 1,
#   cycle: "Herbaceous Perennial",
#   poisonous_to_pets: 0,
#   poisonous_to_humans: 0,
#   edible: 0, 
#   medicinal: 0
# }])

# User.create!([{
#     username: "GardenGreen" , name: "Gina" , privacy: false, email: "fake34@fake.com", recieve_dev_emails: true, status:"Doing great! Loving indoor gardening", admin:true, password: "test123"
# }, {username: "GrowingEveryDay", name: "Bruce", privacy: false, email: 'fake48@fake.com', recieve_dev_emails: false, status: "Looking forward to the spring", admin:false, password: "test456"},
# {username: "Davina", name: "Davina", privacy: false, email: 'fake56@fake.com', recieve_dev_emails: false, status: "Excited to gift my jams", admin:false, password: "test456"}])



# Entry.create!([{
#     nickname: "GoldenPothos",
#     location: "Office",
#     notes: "Grown from a tiny rooted leaf",
#     image: "",
#     user_id: 1,
#     plant_id: 1,
#     health: 4,
#     problems: [],
#     open_to_advice: 0
# },
# {
#   nickname: "PurpleVelvet the 3rd",
#   location: "Bedroom",
#   notes: "My granddaughter plant from Vita",
#   image: "",
#   user_id: 1,
#   plant_id: 2,
#   health: 4,
#   problems: ["not fuzzy enough"],
#   open_to_advice: 1
# },
# {
#   nickname: "Tradascantia the strong",
#   location: "Office",
#   notes: "A prop from my previous Tradiscantia that I threw away because of mealy bug infestation",
#   image: "",
#   user_id: 1,
#   plant_id: 3,
#   health: 4,
#   problems: [],
#   open_to_advice: 0
# }])

# Comment.create!([{
#   text: "I heard putting your plant in more light will make it fuzzier",
#   user_id: 2,
#   entry_id:2
# },
# {
#   text: "Thank you! I have just the spot, I'll try it ASAP",
#   user_id: 1,
#   entry_id: 2
# }])