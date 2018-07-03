SELECT * 
FROM friendships
INNER JOIN users ON friendships.user_one = users.id 
WHERE user_one = $1 OR user_two = $1
UNION
SELECT *
FROM friendships
INNER JOIN users ON friendships.user_two = users.id 
WHERE user_one = $1 OR user_two = $1