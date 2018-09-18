
CREATE TABLE
IF NOT EXISTS
    books
(
      id SERIAL PRIMARY KEY,
      author VARCHAR
(255) UNIQUE NOT NULL,
      title VARCHAR
(255) UNIQUE NOT NULL,
      isbn VARCHAR
(255) UNIQUE NOT NULL,
      image_url VARCHAR
(255),
      description text NOT NULL
      );

insert into books
  (author, title, isbn, image_url, description)
values
  (
    'Coll Thrush',
    'Native Seattle',
    '9780295741352',
    'http://books.google.com/books/content?id=381iDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    'This updated edition of Native Seattle brings the indigenous story to the present day and puts the movement of recognizing Seattle Native past into a broader context. Native Seattle focuses on the experiences of local indigenous communities on whose land Seattle grew, accounts of Native migrants to the city and the development of a multi-tribal urban community, as well as the role Native Americans have played in the narrative of Seattle.'
);

insert into books
  (author, title, isbn, image_url, description)
values
  (
    'Kristine Leander',
    'Norwegian Seattle',
    '9780738559605',
    'ttp://books.google.com/books/content?id=mo7Oa5Vtv1sC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    'The Norwegians who immigrated to Seattle were a sturdy stock. Perhaps it was due to their ancient history as determined Viking seafarers--or their more recent experiences as tenacious fishermen, farmers, loggers, and carpenters. From the first Norwegians to arrive in 1868 through today, Seattle Norwegian American community has maintained a remarkable cohesiveness. They participate in Sons and Daughters of Norway and other clubs; enjoy lutefisk dinners, lively music and dance groups, and the annual May 17 parade; boast elaborately knitted sweaters and historic costumes; and labor over language classes and genealogy. The result is a pride of heritage unique to the Norwegian Americans in Seattle and a sinew that binds their community.'
);

insert into books
  (author, title, isbn, image_url, description)
values
  (
    'Murray Morgan',
    'Skid Road',
    '9780295743509',
    'http://books.google.com/books/content?id=5dpODwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    'Skid Road tells the story of Seattle \ufffdfrom the bottom up,\ufffd offering an informal and engaging portrait of the Emerald City\ufffds first century, as seen through the lives of some of its most colorful citizens. With his trademark combination of deep local knowledge, precision, and wit, Murray Morgan traces the city\ufffds history from its earliest days as a hacked-from-the-wilderness timber town, touching on local tribes, settlers, the lumber and railroad industries, the great fire of 1889, the Alaska gold rush, flourishing dens of vice, general strikes, the 1962 World\ufffds Fair, and the stuttering growth of the 1970s and \ufffd80s. Through it all, Morgan shows us that Seattle\ufffds one constant is change and that its penchant for reinvention has always been fueled by creative, if sometimes unorthodox, residents. With a new introduction by Pulitzer Prize-winning book critic Mary Ann Gwinn, this redesigned edition of Murray Morgan\ufffds classic work is a must for those interested in how Seattle got to where it is today.'
);

insert into books
  (author, title, isbn, image_url, description)
values
  (
    'Jay Steere',
    'Good Night Seattle',
    '9781602199347',
    'http://books.google.com/books/content?id=DNrmCQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    'In this soothing board book, young readers will delight in a personal tour of one the country&#39;s most interesting cities. From the Puget Sound to the Woodland Park Zoo, these colorful pages leave no stone unturned. Special sites and attractions include the Lake Washington Ship Canal, Burke-Gilman Trail, Seattle Public Library, Lake Union Houseboats, Mount Rainier, Space Needle, Pacific Science Center, Gas Works Park, Seattle Aquarium, Museum of Flight, Pike Place Market, and more.'
);

insert into books
  (author, title, isbn, image_url, description)
values
  (
    'Ross Allison',
    'Spooked in Seattle',
    '9781578605026',
    'http://books.google.com/books/content?id=LfAAUxDG-hkC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api
http://books.google.com/books/content?id=LfAAUxDG-hkC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    'Seattle may not be as old as some would expect from a haunted city. But it has a large number of haunted sites and stories. Spooked in Seattle will lead readers on a journey through Seattle&#39;s neighborhoods and reveal the city&#39;s public locations, history, and tales of strange encounters. For those who love to venture off into corners in search of ghosts and the unknown, this book will set readers forth in the right direction. Spooked in Seattle features more than 150 haunted locations, historic and contemporary photos, top ten questions about ghosts, Seattle&#39;s top ten most haunted places, location maps and addresses, Seattle history and haunted facts, Seattle cemeteries and tombstone symbols, and more. Spooked in Seattle presents many locations throughout the city that are believed to be haunted, claim to have ghosts, or have undergone investigation. All of these stories are broken down into sections based on the city&#39;s neighborhoods with corresponding addresses to make finding them easier for the ghost enthusiasts. Maps and photos help bring to life the locations, making the Seattle ghosthunting experience easy and enjoyable.'
);
