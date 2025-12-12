-- Question 1: Insert some data into a table
INSERT INTO cd.facilities (facid, name, membercost, guestcost, initialoutlay, monthlymaintenance) VALUES (9,'Spa', 20, 30, 100000, 800);

-- Question 2: Insert calculated data into a table
INSERT INTO cd.facilities
(facid, name, membercost, guestcost, initialoutlay, monthlymaintenance)
SELECT (SELECT max(facid) from cd.facilities)+1, 'Spa', 20, 30, 100000, 800;

-- Question 3: Update some existing data
UPDATE cd.facilities SET initialoutlay =10000  WHERE facid = 1;

-- Question 4: Update a row based on the contents of another row
UPDATE cd.facilities SET
    membercost = (SELECT membercost * 1.1 FROM cd.facilities WHERE facid = 0),
    guestcost  = (SELECT guestcost  * 1.1 FROM cd.facilities WHERE facid = 0)
where facid =1;

-- Question 5:  Delete all bookings
TRUNCATE TABLE cd.bookings;

-- Question 6:  Delete a member from the cd.members table
DELETE FROM cd.members WHERE memid = 37;

-- Question 7: Control which rows are retrieved
SELECT facid, name, membercost, monthlymaintenance from cd.facilities
WHERE membercost > 0 AND membercost < (monthlymaintenance / 50);

-- Question 8: Basic string searches
SELECT * FROM cd.facilities WHERE name LIKE '%Tennis%';

-- Question 9: Matching against multiple possible values
SELECT * FROM cd.facilities WHERE facid IN (1,5);

-- Question 10: Working with dates
SELECT memid, surname, firstname, joindate FROM cd.members
WHERE joindate >= '2012-09-01';

-- Question 11: Combining results from multiple queries
SELECT surname from cd.members UNION SELECT name FROM cd.facilities;

-- Question 12:  Retrieve the start times of members' bookings
SELECT bk.starttime FROM cd.bookings bk
JOIN cd.members m ON m.memid = bk.memid
WHERE firstname = 'David' AND surname = 'Farrell';

-- Question 13: Work out the start times of bookings for tennis courts
SELECT bk.starttime AS start, fa.name FROM cd.bookings bk JOIN cd.facilities fa
ON bk.facid = fa.facid
WHERE fa.name LIKE 'Tennis Court%' AND bk.starttime >= '2012-09-21'
AND bk.starttime <  '2012-09-22'
ORDER by bk.starttime;

-- Question 14: Produce a list of all members, along with their recommender
SELECT mem.firstname AS memfname, mem.surname AS memsname, r.firstname AS recfname,
r.surname AS recsname FROM cd.members mem LEFT JOIN cd.members r
ON mem.recommendedby = r.memid
ORDER BY mem.surname, mem.firstname;

-- Question 15: Produce a list of all members who have recommended another member
SELECT DISTINCT rec.firstname AS firstname, rec.surname AS surname FROM
cd.members rec JOIN cd.members mem ON rec.memid = mem.recommendedby
ORDER BY rec.surname, rec.firstname;

-- Question 16: Produce a list of all members, along with their recommender, using no joins.
SELECT DISTINCT me.firstname || ' ' ||  me.surname AS member,
(SELECT rec.firstname || ' ' || rec.surname AS recommender FROM cd.members rec
WHERE rec.memid = me.recommendedby)
FROM cd.members me ORDER BY member;

-- Question 17:  Count the number of recommendations each member makes.
SELECT recommendedby, COUNT(*) AS count FROM cd.members WHERE recommendedby IS NOT NULL
GROUP BY recommendedby ORDER BY recommendedby;


-- Question 18: List the total slots booked per facility
SELECT facid, SUM(slots) AS "Total Slots" FROM cd.bookings
GROUP BY facid ORDER BY facid;

-- Question 19: List the total slots booked per facility in a given month
SELECT facid, SUM(slots) AS "Total Slots" FROM cd.bookings
WHERE starttime >= '2012-09-01' and starttime < '2012-10-01'
GROUP BY facid ORDER BY SUM(slots);

-- Question 20: List the total slots booked per facility per month
SELECT facid, EXTRACT(month FROM starttime) AS month, sum(slots) AS "Total Slots"
FROM cd.bookings
WHERE starttime >= '2012-01-01' AND starttime < '2013-01-01'
GROUP BY facid, month ORDER BY facid, month;

-- Question 21: Find the count of members who have made at least one booking
SELECT COUNT(DISTINCT memid) FROM cd.bookings;

-- Question 22: List each member's first booking after September 1st 2012
SELECT m.surname, m.firstname, m.memid, MIN(bk.starttime) FROM cd.members m JOIN
cd.bookings bk ON m.memid = bk.memid
WHERE starttime >= '2012-09-01' GROUP BY m.surname, m.firstname, m.memid ORDER BY m.memid;

-- Question 23: Produce a list of member names, with each row containing the total member count
SELECT COUNT(*) OVER(), firstname, surname FROM cd.members
ORDER BY joindate;

-- Question 24: Produce a numbered list of members
SELECT ROW_NUMBER() OVER(), firstname, surname from cd.members
order by joindate;

-- Question 25: Output the facility id that has the highest number of slots booked, again
SELECT facid, total FROM (
SELECT facid, SUM(slots) total, RANK() OVER(ORDER BY sum(slots) DESC) r
FROM cd.bookings GROUP BY facid) WHERE r = 1;

-- Question 26: Format the names of members
SELECT CONCAT(surname, ', ' ,firstname) AS name FROM cd.members;

-- Question 27: Find telephone numbers with parentheses
SELECT memid, telephone FROM cd.members WHERE telephone LIKE '%(%'
ORDER BY memid;

-- Question 28: Count the number of members whose surname starts with each letter of the alphabet
SELECT SUBSTR (mem.surname,1,1) AS letter, COUNT(*) AS COUNT FROM cd.members mem
GROUP BY letter ORDER BY letter;

