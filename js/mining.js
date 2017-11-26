var hashes = [
    "649XQSFQHTK9R785",
    "BA1FPKNVMER4TXV9",
    "CEMHCZBS99ZHHTG5",
    "15KON3TDHQSFOUZJ",
    "JPM9AMSJGW8XW9RJ",
    "WR7780K575HD34XW",
    "GVXMU4F98QM714FC",
    "AK8KTZP821ODBM4S",
    "N03H0NVASB945RXH",
    "OPZY5HLAW9LRRFIM",
    "CHW8OOKTQBR48XOI",
    "MYWDE1BJB6MYE99Z",
    "0B6ZYERED6OC3TJ2",
    "UGWCI8AMM57PE7TF",
    "1PAVVPGTGT4M4DAL",
    "FIZPT5L21WH2RSKJ",
    "5Z9ZV8AKH95VTT59",
    "ACFO4VUWAE4206QH",
    "U66GQDANFHHY8YP1",
    "4ETDWO9AWKHZ3644",
    "1L3W5ONDLEAMC4FU",
    "UU0W8DN3MNWPB1HO",
    "3IQV5XHTG31YPK1A",
    "DMNGI8JTSK8IYP75",
    "E0P7JWM1IK12M4QX",
    "IEM3KYY4IUUBQRZ9",
    "O0YFBNXGQ1WDWKWA",
    "Q68VJCVBV1QL962H",
    "K4SEL45613GMJ9GC",
    "DZ733TEQ5GWSHB7V",
    "JQTDXAOFF874UQCI",
    "6ELHPZ0JLGEG9F8C",
    "K60X461DRPBSKIUQ",
    "FESO92YZHIANWGSP",
    "1OL8DCLK07GN1GRT",
    "9X4CSMU86QPFG6NO",
    "UW9E1I1WRJG5PXZZ",
    "UZMMFTLHXL6V3ONN",
    "OVXAGJKW5JBJ8XEF",
    "TQ7E3VVYR0C1CZS8",
    "87LOYFPM4O071EH4",
    "ORA9DBANURBLMMS6",
    "YNLF0P1SIA33PVRO",
    "M4P1VXHORDVJWUVK",
    "24A8PKCS38HJPU45",
    "5JL4A4TLJIC2FVKI",
    "OYY4VJJX2EFE6WZB",
    "PCXABFHN10LY7EPD",
    "PQAGRVLWKU4XBSZA",
    "RFP8E4BYWENCZDMF",
    "CGHW2SC6BALN0ASB",
    "CG2QJZZWC78UUIB9",
    "4XK3VJXYPV0KFPMT",
    "0LCK30RVSQFDTP80",
    "IQEYF7PYNMZHR9YX",
    "AIYRIO47VFBUX9IU",
    "4W28DWLLNZC5BE3G",
    "HPOPCZSQNPGKCGMA",
    "DDQ00RIIR8UQWKWF",
    "7RZPSIQLZ608JT4K",
    "HST55M1HHQ8H32KP",
    "UF1PUF3KG1LXJ13V",
    "2DDQQIXMHXN3UKCK",
    "3E0UJVVZFO48EJ2H",
    "7KILT5PQ3TDNJMH1",
    "6M8TOE81V3LRLBZE",
    "XRM6K542RB5FGLIY",
    "SBOS3MERT8PYFG24",
    "0T8PGTFDEB4Z6NML",
    "LOIMVJW21KZVOA9Z",
    "1CBA4AKDD0GNHJ31",
    "U7VZOA2NUKL0T75I",
    "0WBTV7V873FWJ73G",
    "OZD4S9PYB65YY19M",
    "BWYBMETS109380PC",
    "892CEAXQ4X9EXMO0",
    "O3ZQRCHYSBZMC4XT",
    "NNPFMHLDOG6A3LX7",
    "JAFCY7LPDXP31YU0",
    "TGT9WECPW7CWM5FX",
    "ZR6M6V6IPXE3SAQ1",
    "7N2HR0E7N6ABX7GU",
    "KANZY8I88ZAJDTQ5",
    "O7LGQUO4ZLUIX6A3",
    "YBZNWYL50VW0R6RY",
    "K87JFS4JPQE4HJFM",
    "O0NLR3FD85JL5YF2",
    "6P8PMD7W6R80RUYU",
    "EBD1DLC30NE3Y776",
    "A3GIDJ3AUNEDIX0E",
    "H9P1HLQRO4P0B9QU",
    "PCVSDJYWS68LWQ9Z",
    "ER19REJMU51BXYFM",
    "XH7Y1JBQ8X1GX5G9",
    "ORME7UY4R76GV6C3",
    "HPH8TC285F1OFX5B",
    "2VGCSWVQ0N5G1D2W",
    "MDHVYYDLQKGWUFNS",
    "4QW8MHX6IKARRTEG",
    "P2ELM1HQ50SDFA16"
];


function runHash() {

    var i = 0;
    while (i < 100) {
        setTimeout(function() {
            //your code to be executed after 1 second
            d3.select("#hashText").text(hashes[i]);
        }, 100);
        i += 1;
    }
}


/*
*
*	jQuery Slot Machine
*
*/
var height_slot_number = '100';

function go(tens,units){
    addSlots($("#slots_units .number-wrapper"));
    addSlots($("#slots_units .number-wrapper"));
    moveSlots($("#slots_units .number-wrapper"),units);
    addSlots($("#slots_tens .number-wrapper"));
    addSlots($("#slots_tens .number-wrapper"));
    moveSlots($("#slots_tens .number-wrapper"),tens);
}

$(document).ready(function(){
    addSlots($("#slots_units .number-wrapper"));
    addSlots($("#slots_tens .number-wrapper"));
    $('#arm').click(function(e) {
        var arm = $(this).addClass('clicked');
        delay = setTimeout(function() { arm.removeClass('clicked');}, 500);
        e.preventDefault();
        go(Math.floor(Math.random() * 10),Math.floor(Math.random() * 10));
    });
});


function addSlots(jqo){
    for(var i = 0; i < 10; i++){
        jqo.append("<div class='slot'>"+ i +"</div>");
    }
}

function moveSlots(jqo,num){
    var time	= 6500;
    var number	= num;
    time		+= Math.round(Math.random()*1000);
    jqo.stop(true,true);

    var num_slot    = Math.round((jqo.find('.slot').length)/20);
    var margin_top  = ((num_slot -1) * (height_slot_number * 10)) + (num * height_slot_number);

    jqo.animate(
        {"margin-top":"-"+ margin_top +"px"},
        {'duration' : time, 'easing' : "easeOutElastic"}
    );
}