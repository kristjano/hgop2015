Failure scenarios:

Given [ Placed(0,0,O) ]
When [ Place(0,0,X) ]
Then [ Fail ]

Given [ Placed(0,0,O) ]
When [ Place(0,3,X) ]
Then [ Fail ]

Winning scenarios:

Given [ Placed(0,0,X), Placed(0,1,X) ]
When [ Place(0,2,X) ]
Then [ X won ]

Given [ Placed(2,0,O), Placed(2,2,O) ]
When [ Place(2,1,0) ]
Then [ O won ]

Given [ Placed(0,0,O), Placed(2,2,O) ]
When [ Place(1,1,O) ]
Then [ O won ]

Given [ Placed(0,2,X), Placed(1,1,X) ]
When [ Place(2,0,X) ]
Then [ X won ]

Draw scenarios:

Given [ Placed(0,0,O), Placed(0,2,X), Placed(1,1,O), Placed(2,2,X)
        Placed(2,0,O), Placed(1,0,X), Placed(1,2,O), Placed(0,1,X)]
When [ Place(2,1,O) ]
Then [ Draw ]
