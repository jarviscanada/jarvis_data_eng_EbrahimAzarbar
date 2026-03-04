# Introduction

This project is about building and exploring a relational database for 
a simple club booking system. The database stores information about members, 
facilities, and bookings, and the main goal is to use SQL to query and analyze
this data in a structured and meaningful way. Through this project, I 
answered practical questions such as who is booking which facilities, 
how often each facility is used, and how member activity changes over time.

This project is mainly aimed at developers or analysts who want to
practice with SQL using a realistic dataset. I worked with PostgreSQL 
running locally inside a Docker container, which made it easy to set up and
reset the database when needed. All queries were written locally
and then verified against the online exercise platform. Git was used to track 
changes throughout the project, and the documentation is written in Markdown.
# SQL Queries

###### Table Setup (DDL)

```sql
CREATE TABLE cd.members
(
    memid          INTEGER,
    surname        VARCHAR(200),
    firstname      VARCHAR(200),
    address        VARCHAR(300),
    zipcode        INTEGER,
    telephone      VARCHAR(20),
    recommendedby  INTEGER,
    joindate       TIMESTAMP,
    CONSTRAINT pk_members PRIMARY KEY (memid),
    CONSTRAINT members_recommendedby_fk FOREIGN KEY (recommendedby) REFERENCES cd.members(memid)
);
```

```sql
CREATE TABLE cd.bookings
(
    bookid     INTEGER,
    facid      INTEGER,
    memid      INTEGER,
    starttime  TIMESTAMP,
    slots      INTEGER,
    CONSTRAINT pk_bookings PRIMARY KEY (bookid),
    CONSTRAINT members_booking_fk FOREIGN KEY (memid) REFERENCES cd.members(memid),
    CONSTRAINT booking_facilities_fk FOREIGN KEY (facid) REFERENCES cd.facilities(facid)
);

```


```sql
CREATE TABLE cd.facilities
(
    facid               INTEGER,
    name                VARCHAR(100),
    membercost          NUMERIC,
    guestcost           NUMERIC,
    initialoutlay       NUMERIC,
    monthlymaintenance  NUMERIC,
    CONSTRAINT pk_facilities PRIMARY KEY (facid)
);
```

## Modifying Data

###### Question 1: Insert some data into a table

```sql
INSERT INTO cd.facilities (facid, name, membercost, guestcost, initialoutlay, monthlymaintenance) VALUES (9,'Spa', 20, 30, 100000, 800);
```

###### Question 2: Insert calculated data into a table

```sql
INSERT INTO cd.facilities
(facid, name, membercost, guestcost, initialoutlay, monthlymaintenance)
SELECT (SELECT max(facid) from cd.facilities)+1, 'Spa', 20, 30, 100000, 800;  
```

###### Question 3: Update some existing data

```sql
UPDATE cd.facilities SET initialoutlay =10000  WHERE facid = 1;
```


###### Question 4: Update a row based on the contents of another row

```sql
UPDATE cd.facilities SET 
    membercost = (SELECT membercost * 1.1 FROM cd.facilities WHERE facid = 0),
    guestcost  = (SELECT guestcost  * 1.1 FROM cd.facilities WHERE facid = 0)
where facid =1;
```


###### Question 5:  Delete all bookings

```sql
TRUNCATE TABLE cd.bookings;
```


###### Question 6:  Delete a member from the cd.members table

```sql
DELETE FROM cd.members WHERE memid = 37;
```

## Basics
###### Question 7: Control which rows are retrieved

```sql
SELECT facid, name, membercost, monthlymaintenance from cd.facilities 
WHERE membercost > 0 AND membercost < (monthlymaintenance / 50);
```

###### Question 8: Basic string searches

```sql
SELECT * FROM cd.facilities WHERE name LIKE '%Tennis%';
```


###### Question 9: Matching against multiple possible values

```sql
SELECT * FROM cd.facilities WHERE facid IN (1,5);
```

###### Question 10: Working with dates

```sql
SELECT memid, surname, firstname, joindate FROM cd.members
WHERE joindate >= '2012-09-01';
```

###### Question 11: Combining results from multiple queries

```sql
SELECT surname from cd.members UNION SELECT name FROM cd.facilities;
```

## Join
###### Question 12:  Retrieve the start times of members' bookings

```sql
SELECT bk.starttime FROM cd.bookings bk 
JOIN cd.members m ON m.memid = bk.memid 
WHERE firstname = 'David' AND surname = 'Farrell';
```

###### Question 13: Work out the start times of bookings for tennis courts

```sql
SELECT bk.starttime AS start, fa.name FROM cd.bookings bk JOIN cd.facilities fa
ON bk.facid = fa.facid
WHERE fa.name LIKE 'Tennis Court%' AND bk.starttime >= '2012-09-21'
AND bk.starttime <  '2012-09-22'
ORDER by bk.starttime;
```

###### Question 14: Produce a list of all members, along with their recommender

```sql
SELECT mem.firstname AS memfname, mem.surname AS memsname, r.firstname AS recfname,
r.surname AS recsname FROM cd.members mem LEFT JOIN cd.members r
ON mem.recommendedby = r.memid
ORDER BY mem.surname, mem.firstname;
```

###### Question 15: Produce a list of all members who have recommended another member

```sql
SELECT DISTINCT rec.firstname AS firstname, rec.surname AS surname FROM
cd.members rec JOIN cd.members mem ON rec.memid = mem.recommendedby
ORDER BY rec.surname, rec.firstname;
```

###### Question 16: Produce a list of all members, along with their recommender, using no joins.

```sql
SELECT DISTINCT me.firstname || ' ' ||  me.surname AS member,
(SELECT rec.firstname || ' ' || rec.surname AS recommender FROM cd.members rec 
WHERE rec.memid = me.recommendedby)
FROM cd.members me ORDER BY member;
```

## Aggregation

###### Question 17:  Count the number of recommendations each member makes.

```sql
SELECT recommendedby, COUNT(*) AS count FROM cd.members WHERE recommendedby IS NOT NULL
GROUP BY recommendedby ORDER BY recommendedby;
```

###### Question 18: List the total slots booked per facility

```sql
SELECT facid, SUM(slots) AS "Total Slots" FROM cd.bookings
GROUP BY facid ORDER BY facid;
```

###### Question 19: List the total slots booked per facility in a given month

```sql
SELECT facid, SUM(slots) AS "Total Slots" FROM cd.bookings 
WHERE starttime >= '2012-09-01' and starttime < '2012-10-01'
GROUP BY facid ORDER BY SUM(slots);
```

###### Question 20: List the total slots booked per facility per month

```sql
SELECT facid, EXTRACT(month FROM starttime) AS month, sum(slots) AS "Total Slots"
FROM cd.bookings
WHERE starttime >= '2012-01-01' AND starttime < '2013-01-01'
GROUP BY facid, month ORDER BY facid, month;
```

###### Question 21: Find the count of members who have made at least one booking

```sql
SELECT COUNT(DISTINCT memid) FROM cd.bookings;         
```

###### Question 22: List each member's first booking after September 1st 2012

```sql
SELECT m.surname, m.firstname, m.memid, MIN(bk.starttime) FROM cd.members m JOIN
cd.bookings bk ON m.memid = bk.memid 
WHERE starttime >= '2012-09-01' GROUP BY m.surname, m.firstname, m.memid ORDER BY m.memid; 
```

###### Question 23: Produce a list of member names, with each row containing the total member count

```sql
SELECT COUNT(*) OVER(), firstname, surname FROM cd.members
ORDER BY joindate;
```

###### Question 24: Produce a numbered list of members

```sql
SELECT ROW_NUMBER() OVER(), firstname, surname from cd.members
order by joindate;
```


###### Question 25: Output the facility id that has the highest number of slots booked, again

```sql
SELECT facid, total FROM (
SELECT facid, SUM(slots) total, RANK() OVER(ORDER BY sum(slots) DESC) r
FROM cd.bookings GROUP BY facid) WHERE r = 1;
```

## String

###### Question 26: Format the names of members

```sql
SELECT CONCAT(surname, ', ' ,firstname) AS name FROM cd.members;
```

###### Question 27: Find telephone numbers with parentheses

```sql
SELECT memid, telephone FROM cd.members WHERE telephone LIKE '%(%'
ORDER BY memid;
```


###### Question 28: Count the number of members whose surname starts with each letter of the alphabet

```sql
SELECT SUBSTR (mem.surname,1,1) AS letter, COUNT(*) AS COUNT FROM cd.members mem
GROUP BY letter ORDER BY letter;    
```




