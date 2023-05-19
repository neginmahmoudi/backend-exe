CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE refresh_token (
  id INT PRIMARY KEY AUTO_INCREMENT,
  refresh_token VARCHAR(300) NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE
); 


INSERT INTO users (name, password) VALUES
('John', 'password123'),
('Sarah', '123456'),
('Michael', 'letmein'),
('Emily', 'qwerty'),
('David', 'admin123');

CREATE TABLE movies (
id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT
);
INSERT INTO movies (title, description) VALUES
('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'),
('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'),
('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'),
('Forrest Gump', 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.'),
('The Lord of the Rings: The Fellowship of the Ring', 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.'),
('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'),
('The Matrix', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'),
('Fight Club', 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.'),
('The Silence of the Lambs', 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.'),
('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.');

CREATE TABLE genre (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
);
INSERT INTO genre (name) VALUES
('Drama'),
('Comedy'),
('Action'),
('Thriller'),
('Horror');


CREATE TABLE movies_genre (
  movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
  genre_id INT REFERENCES genre(id) ON DELETE CASCADE,
  PRIMARY KEY (movie_id, genre_id)
);

INSERT INTO movies_genre (movie_id, genre_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 3),
  (3, 2),
  (4, 3);

CREATE TABLE reviews (
id INT PRIMARY KEY AUTO_INCREMENT,
 content TEXT NOT NULL,
 user_id INT REFERENCES users(id) ON DELETE CASCADE,
 movie_id INT REFERENCES movies(id) ON DELETE CASCADE
);
INSERT INTO reviews (content, user_id, movie_id) VALUES
('This movie was amazing! I loved every minute of it.', 1, 1),
('I thought this movie was just okay. Not terrible, but not great either.', 2, 1),
('One of my favorite movies of all time. I can watch it over and over again.', 3, 2),
('I was on the edge of my seat the entire time. Such a thrilling movie!', 4, 5),
('This movie was so scary, I had trouble sleeping after watching it!', 5, 8);

