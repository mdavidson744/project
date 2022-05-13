from pymongo import MongoClient

#-------------- FILE INFO

# use whenever the users db collection has been dropped.
# delete file (after ran) if deployed

# ---------------- / FILE INFO

client = MongoClient( "mongodb://127.0.0.1:27017")
db = client.projectV1
carListings = db.carListings

#creating default cars & populating db slightly
#20 listings to fill page 1 of car listings (full pagination)
car_list = [
    {   
        "make": "Toyota",
        "model": "Camry",
        "year": "2020",
        "gearbox": "Automatic",
        "engineCapacity": "2000",
        "engineType": "Petrol",
        "numberSeats": "5",
        "numberDoors": "5",
        "colour": "Silver",
        "description": "description for recording / panel",
        "regNumber": "abc2020",
        "price": "26000",
        "photos": [],
        "user": "admin"
    }, #one
    {   
        "make": "BMW",
        "model": "320d",
        "year": "2010",
        "gearbox": "Manual",
        "engineCapacity": "2000",
        "engineType": "Diesel",
        "numberSeats": "4",
        "numberDoors": "3",
        "colour": "Red",
        "description": "description for recording / panel",
        "regNumber": "def2010",
        "price": "3600",
        "photos": [],
        "user": "admin"
    }, #two
    {   
        "make": "Audi",
        "model": "A4",
        "year": "2016",
        "gearbox": "Manual",
        "engineCapacity": "2000",
        "engineType": "Diesel",
        "numberSeats": "5",
        "numberDoors": "5",
        "colour": "Black",
        "description": "description for recording / panel",
        "regNumber": "efg2016",
        "price": "15999",
        "photos": [],
        "user": "admin"
    }, #three
    {   
        "make": "Volkswagon",
        "model": "Golf GTD",
        "year": "2013",
        "gearbox": "Manual",
        "engineCapacity": "2000",
        "engineType": "Diesel",
        "numberSeats": "5",
        "numberDoors": "3",
        "colour": "White",
        "description": "description for recording / panel",
        "regNumber": "hij2013",
        "price": "9999",
        "photos": [],
        "user": "admin"
    }, #four
    {   
        "make": "Mini",
        "model": "One",
        "year": "2011",
        "gearbox": "Manual",
        "engineCapacity": "1600",
        "engineType": "Petrol",
        "numberSeats": "4",
        "numberDoors": "3",
        "colour": "Cream",
        "description": "description for recording / panel",
        "regNumber": "klm2011",
        "price": "2600",
        "photos": [],
        "user": "admin"
    }, #five
    {   
        "make": "Mini",
        "model": "Cooper S",
        "year": "2006",
        "gearbox": "Manual",
        "engineCapacity": "1600",
        "engineType": "Petrol",
        "numberSeats": "4",
        "numberDoors": "3",
        "colour": "Grey",
        "description": "description for recording / panel",
        "regNumber": "nop2006",
        "price": "4000",
        "photos": [],
        "user": "admin"
    }, #six
    {   
        "make": "BMW",
        "model": "118d",
        "year": "2012",
        "gearbox": "Manual",
        "engineCapacity": "1800",
        "engineType": "Diesel",
        "numberSeats": "5",
        "numberDoors": "3",
        "colour": "Red",
        "description": "description for recording / panel",
        "regNumber": "qrs2012",
        "price": "5200",
        "photos": [],
        "user": "admin"
    }, #seven
    {   
        "make": "Lexus",
        "model": "LS460",
        "year": "2009",
        "gearbox": "Automatic",
        "engineCapacity": "4600",
        "engineType": "Petrol",
        "numberSeats": "5",
        "numberDoors": "5",
        "colour": "Silver-blue",
        "description": "( REAR RELAXATION & ENTERTAINMENT PACK ) FULL IMPECCABLE SERVICE RECORD ********** LEXUS'S FLAGSHIP LS IN THE BEST COLOUR SCHEME WITH THE BEST POSSIBLE PEDIGREE *** OVER 80 LEXUS'S IN STOCK - UK'S LARGEST LEXUS SPECIALIST *** FULL SERVICE RECORD 13 SERVICE STAMPS ( 13 ARE THE LEXUS MAIN DEALER TO 146,000 ) LAST SERVICED CARRIED OUT IN LEXUS WOLVERHAMPTON IN OCTOBER 2021 ( GEARX BOX OIL DONE @ 113,000 IN 2018 ) ----- 13 LEXUS STAMPS SERVICED IN LEXUS WOLVERHAMPTON IN 2021 AT 146,000 *** ULEZ & LEZ COMPLIANT *** ELITE MOTOR COMPANY ARE PROUD TO OFFER THIS HUGE SPEC Lexus LS460 4.6 V8 SE-L -- PETROL - AUTOMATIC 5dr SALOON // PV59 AYC // ....... 2009 ...... Petrol Automatic. / PRESENTED IN THE BEST COLOUR COMBINATION SILVER CRYSTAL METALLIC WITH LIGHT IVORY LEATHER /------- PRESENTED WITH MOT TILL 09 OCTOBER 2022 WITH NO ADVISORIES - DONE IN LEXUS ) -------------- HUGE SPEC INCLUDING TWIN MEMORY SEATS / ELECTRIC SEATS & REAR SEATS / HEATED SEATS - AIR COOLED SEATS / FULL LEATHER SEATS / CURB CAMERA WITH REVERSE CAMERA / FRONT AND REAR PARKING SENSORS WITH REVERSE CAMERA / BI XENON INTELLIGANT LIGHTING WITH CORNERING / MARK LEVISION SOUND SYSTEM / 19'' ALLOYS / ELECTRIC MIRRORS WITH POWERFOLD - ALL ROUND ELECTRIC WINDOWS - COMFORT SEATS - KEYLESS ENTRY WITH KEYLESS GO --- REAR DVD ENTERTAINMENT ----- SOFT CLOSE DOORS & BOOTLID -----ALL DOCUMENTATION - BOOK PACKS & 2 KEYS + WE ARE A RAC PARTNER DEALER WE OFFER 3 TO 36 MONTHS EXTENDABLE WARRANTY ( please call for a price) - *** FINANCE AVAILABLE ON THIS CAR CALL FOR MORE DETAILS *** ALL DOCS PRESENT + SUPERB CONDITION INSIDE AND OUT + DRIVES FAULTLESS WITH NO KNOCKS OR RATTLES + GEARBOX CHANGES PERFECTLY + FIRST TO VIEW WILL BUY THIS VEHICLE + 4 GOOD TYRES + VERY WELL CARED FOR + HPI CLEAR & MILEAGE CHECKED + FULLY VALETED + PDI ( 42 point pre deliver inspection) + OPTIONAL 3 TO 36 MONTHS WARRANTY + PART EXCHANGE CONSIDERED ON THIS CAR + PLEASE CALL TO BOOK A VIEWING OR TEST DRIVE + OPEN 7 DAYS A WEEK + 5 MINUTES FROM EAST CROYDON 1 MINS FROM NORWOOD JUNCTION + 30 MINS FROM THE M25 + VIEWING POSTCODE SE25 4PT , Silver, ALL OUR CARS ARE HAND PICKED AND TEST DRIVEN BY THE BUSINESS OWNERS FOR OUR CUSTOMERS SATISFACTION, £7,950 p/x considered",
        "regNumber": "tuv2009",
        "price": "7950",
        "photos": [],
        "user": "admin"
    }, #eight
    {   
        "make": "Lexus",
        "model": "LS430",
        "year": "2004",
        "gearbox": "Automatic",
        "engineCapacity": "4300",
        "engineType": "Petrol",
        "numberSeats": "5",
        "numberDoors": "5",
        "colour": "Silver",
        "description": "Immaculate Ls430. Fully Serviced, Elderly One Owner. 6 months Warranty, 12 Months Mot. Totally factory condition. Unmatched build quality, Even Lexus couldn’t beat this era of the LS. It never got any better, The last of the proper V8s before everything went eco friendly! Genuine low mileage example, Ready to be loved. Comes with a 6 months warranty, 2 keys, Full book pack. , Silver, 2 owners, ALL DEALER FACILITIES - VIDEO AVAILABLE - SEE OUR REVIEWS- EXTENDED WARRANTY PACKAGES & DELIVERY, £7,990",
        "regNumber": "wxyz2004",
        "price": "7900",
        "photos": [],
        "user": "admin"
    }, #nine
    {   
        "make": "Toyota",
        "model": "Prius",
        "year": "2003",
        "gearbox": "Automatic",
        "engineCapacity": "2000",
        "engineType": "Electric",
        "numberSeats": "5",
        "numberDoors": "5",
        "colour": "Silver",
        "description": "description for recording / panel",
        "regNumber": "abc2003",
        "price": "2000",
        "photos": [],
        "user": "admin"
    }, #ten
    {   
        "make": "Suzuki",
        "model": "Swift",
        "year": "2009",
        "gearbox": "Manual",
        "engineCapacity": "1200",
        "engineType": "Petrol",
        "numberSeats": "5",
        "numberDoors": "5",
        "colour": "Blue",
        "description": "description for recording / panel",
        "regNumber": "def2009",
        "price": "1900",
        "photos": [],
        "user": "admin"
    }, #eleven
    {   
        "make": "Skoda",
        "model": "Octavia",
        "year": "2022",
        "gearbox": "Automatic",
        "engineCapacity": "2000",
        "engineType": "Petrol",
        "numberSeats": "5",
        "numberDoors": "5",
        "colour": "Black",
        "description": "description for recording / panel",
        "regNumber": "ghi2022",
        "price": "25000",
        "photos": [],
        "user": "admin"
    }, #twelve
    {   
        "make": "Vauxhall",
        "model": "Corsa",
        "year": "2011",
        "gearbox": "Manual",
        "engineCapacity": "1000",
        "engineType": "Petrol",
        "numberSeats": "5",
        "numberDoors": "5",
        "colour": "Black",
        "description": "description for recording / panel",
        "regNumber": "jkl2011",
        "price": "2200",
        "photos": [],
        "user": "admin"
    }, #thirteen
    {   
        "make": "Nissan",
        "model": "350z",
        "year": "2006",
        "gearbox": "Manual",
        "engineCapacity": "3500",
        "engineType": "Petrol",
        "numberSeats": "2",
        "numberDoors": "3",
        "colour": "Blue",
        "description": "description for recording / panel",
        "regNumber": "mno2006",
        "price": "3900",
        "photos": [],
        "user": "admin"
    }, #fourteen
    {   
        "make": "Mazda",
        "model": "MX5",
        "year": "1998",
        "gearbox": "Manual",
        "engineCapacity": "1800",
        "engineType": "Petrol",
        "numberSeats": "2",
        "numberDoors": "3",
        "colour": "Silver",
        "description": "description for recording / panel",
        "regNumber": "pqr1998",
        "price": "3600",
        "photos": [],
        "user": "admin"
    },# fifteen
    {   
        "make": "Mercedes",
        "model": "A180d",
        "year": "2020",
        "gearbox": "Manual",
        "engineCapacity": "1799",
        "engineType": "Diesel",
        "numberSeats": "5",
        "numberDoors": "5",
        "colour": "Grey",
        "description": "description for recording / panel",
        "regNumber": "stu2020",
        "price": "19000",
        "photos": [],
        "user": "admin"
    }, #sixteen
    {   
        "make": "Mercedes",
        "model": "C220d",
        "year": "2012",
        "gearbox": "Automatic",
        "engineCapacity": "2000",
        "engineType": "Diesel",
        "numberSeats": "5",
        "numberDoors": "5",
        "colour": "Silver",
        "description": "description for recording / panel",
        "regNumber": "vwx2012",
        "price": "4800",
        "photos": [],
        "user": "admin"
    }, #seventeen
    {   
        "make": "Ford",
        "model": "Fiesta",
        "year": "2015",
        "gearbox": "Manual",
        "engineCapacity": "1000",
        "engineType": "Petrol",
        "numberSeats": "5",
        "numberDoors": "3",
        "colour": "White",
        "description": "description for recording / panel",
        "regNumber": "xyz2016",
        "price": "6200",
        "photos": [],
        "user": "admin"
    }, #eighteen
    {   
        "make": "Ford",
        "model": "Focus",
        "year": "2010",
        "gearbox": "Manual",
        "engineCapacity": "2000",
        "engineType": "Petrol",
        "numberSeats": "5",
        "numberDoors": "5",
        "colour": "Black",
        "description": "description for recording / panel",
        "regNumber": "abc2010",
        "price": "4100",
        "photos": [],
        "user": "admin"
    }, #nineteen
    {   
        "make": "Seat",
        "model": "Ibiza FR",
        "year": "2014",
        "gearbox": "Manual",
        "engineCapacity": "2000",
        "engineType": "Petrol",
        "numberSeats": "5",
        "numberDoors": "3",
        "colour": "Red",
        "description": "description for recording / panel",
        "regNumber": "def2014",
        "price": "4600",
        "photos": [],
        "user": "admin"
    }, #twenty
    {   
        "make": "Toyota",
        "model": "Chaser",
        "year": "1997",
        "gearbox": "Manual",
        "engineCapacity": "2500",
        "engineType": "Petrol",
        "numberSeats": "5",
        "numberDoors": "5",
        "colour": "White",
        "description": "Imported from Japan in 2020. Factory Manual with factory turbo 1jz. Cusco coilovers. Sitting on sticky Michellin PS4 tyres. Vertex bodykit",
        "regNumber": "p670gpf",
        "price": "25000",
        "photos": [],
        "user": "admin"
    }, #twenty one
    {   
        "make": "Lexus",
        "model": "LS400 ",
        "year": "1998",
        "gearbox": "Automatic",
        "engineCapacity": "4000",
        "engineType": "Petrol",
        "numberSeats": "5",
        "numberDoors": "5",
        "colour": "Silver",
        "description": "Welded differential. needs a drivers side door, wing & bumper. Apart from that, lovely car. v8 ticks smooth, interior is in great condition. Sitting on unbranded coilovers. Very low but can be raised for new owner.",
        "regNumber": "til5797",
        "price": "2500",
        "photos": [],
        "user": "admin"
    }, #twenty two
    {   
        "make": "Vauxhall",
        "model": "Astra",
        "year": "2010",
        "gearbox": "Manual",
        "engineCapacity": "1800",
        "engineType": "Petrol",
        "numberSeats": "5",
        "numberDoors": "3",
        "colour": "White",
        "description": "description for recording / panel",
        "regNumber": "pez7163",
        "price": "2100",
        "photos": [],
        "user": "admin"
    }, #twenty three
    {   
        "make": "Nissan",
        "model": "350z",
        "year": "2004",
        "gearbox": "Manual",
        "engineCapacity": "3500",
        "engineType": "Petrol",
        "numberSeats": "2",
        "numberDoors": "3",
        "colour": "Grey",
        "description": "description for recording / panel",
        "regNumber": "CA54KVJ",
        "price": "3400",
        "photos": [],
        "user": "admin"
    }, #twenty four
    {   
        "make": "Ford",
        "model": "Fiesta",
        "year": "2002",
        "gearbox": "Manual",
        "engineCapacity": "1400",
        "engineType": "Petrol",
        "numberSeats": "5",
        "numberDoors": "3",
        "colour": "Red",
        "description": "description for recording / panel",
        "regNumber": "CEZ2900",
        "price": "1600",
        "photos": [],
        "user": "admin"
    }, #twenty
    {   
        "make": "Mazda",
        "model": "MX5",
        "year": "1999",
        "gearbox": "Manual",
        "engineCapacity": "1600",
        "engineType": "Petrol",
        "numberSeats": "2",
        "numberDoors": "3",
        "colour": "British racing green",
        "description": "description for recording / panel",
        "regNumber": "VLZ7530",
        "price": "4000",
        "photos": [],
        "user": "admin"
    }, #twenty
    {   
        "make": "Seat",
        "model": "Leon",
        "year": "2007",
        "gearbox": "Manual",
        "engineCapacity": "2000",
        "engineType": "Petrol",
        "numberSeats": "5",
        "numberDoors": "5",
        "colour": "Black",
        "description": "description for recording / panel",
        "regNumber": "u002tom",
        "price": "4600",
        "photos": [],
        "user": "admin"
    }, #twenty
]


for new_car in car_list:
    carListings.insert_one(new_car)
    print("listing added")