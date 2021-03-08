/* HEADER present day and time */

var currentDay = $("#currentDay");

function displayTime() { 
    var rightNow = moment().format('dddd[,] MMMM DD, YYYY');
    currentDay.text(rightNow);
}

var text_Hour = 9;
var text_Suffix = ":00am";


function setBGColor($div, currentTime, textTime)
{
    var iTime_CUR = currentTime.split("");
    var iTime_TXT = textTime.split("");

    if(iTime_CUR[iTime_CUR.length - 2] !== iTime_TXT[iTime_TXT.length - 2])
    {
        if(iTime_CUR[iTime_CUR.length - 2] > iTime_TXT[iTime_TXT.length - 2])
        {
            console.log("p > a");
            $div.addClass("bg-secondary");
        }
        else
        {
            console.log("p < a");
            $div.addClass("bg-primary");
        }
    }
    else

        console.log("same time of day");

        var t_CUR = parseHour(iTime_CUR);
        var t_TXT = parseHour(iTime_TXT);

        if(parseInt(t_CUR) > parseInt(t_TXT))
        {
            console.log("current greater");
            $div.addClass("bg-secondary");
        }
        else if(parseInt(t_CUR) < parseInt(t_TXT))
        {
            if(parseInt(t_TXT) === 12)
            {
                console.log("current greater");
                $div.addClass("bg-secondary");
            }
            else
            {
                console.log("current less");
                $div.addClass("bg-primary");
            }
        }
        else
        {
            $div.addClass("bg-warning");
        }
    } 

function generateHourBlock(iterations)
{
    var currentTime = GetCurrentHour("LT");

    for(var i = 0; i < iterations; i++)
    {
        var text_time = text_Hour + text_Suffix;

        $iBlock = $("<div>").addClass("row py-1");
    
        $iTimeText = $("<h5>").addClass("text-center").text(text_time);
        $iTimeDiv = $("<div>").addClass("col-2 py-3 bg-warning align-middle").append($iTimeText);

        $iTextDiv = $("<textarea>").addClass("col-8 py-3 overflow-auto").text("").attr("id", text_time);
        setBGColor($iTextDiv, currentTime, text_time);
    
        $iLockIcon = $("<span>").addClass("lock");

        $iLockDiv = $("<div>").addClass("col-1 py-3 lock-container border border-primary").append($iLockIcon);
        
        $iLockIcon.toggleClass('unlocked');
    
        $iBlock.append($iTimeDiv, $iTextDiv, $iLockDiv);
    
        $("#planner").append($iBlock);
    
        incrementTextHour();
    }

}

function incrementTextHour()
{
    if(text_Hour === 12)
    {
        text_Hour = 1;
    }
    else if(text_Hour === 11)
    {
        text_Suffix = ":00pm";
        text_Hour++;
    } else
    {
        text_Hour++;
    }
}

function DisplayDate(pFormat)
{
    var date = moment().format(pFormat);

    $("#current-date").text(date);
}


function GetCurrentHour(pFormat)  //formats time from ParseHour
{
    var time = moment().format(pFormat).toLowerCase();
    //current HOUR and MINUTES
    console.log(time);
    
    var hour = parseHour(time); 
    // current HOUR 

    if(time[time.length - 2] === "p")
    {
        suffix = ":00pm";
    }
    else
    {
        suffix = ":00am";
    }

    
    console.log(hour + suffix);
    return hour + suffix;
}


function parseHour(pTime) // feeds GetCurrentHour
{
    var i = 0;
    var iHour = "";

    while(pTime[i] !== ":" || i > 100)
    {
        iHour += pTime[i];
        i++;
    }

    return iHour;
}


generateHourBlock(9); //how many hours to display
DisplayDate("LLLL");


$(".lock").click(function() {
    console.log("lock clicked");


    $(this).toggleClass('unlocked');

    $iTextArea = $($(this).parent().parent().children()[1]);

    iInput = $iTextArea.val();
    iID = $iTextArea.attr("id");
  });


setInterval(displayTime, 1000);
