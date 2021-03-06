
//Initalizes hashes for scrolling text to run through
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
    d3.select("#errorWrapper").style("visibility", "hidden");
    d3.select("#errorHash").text("");
    myLoop();

    // Recursively loops through hashes creating scrolling effect
    function myLoop() {
        setTimeout(function() {
            //executes code after 40 milliseconds
            d3.select("#hashText").text(hashes[i]);
            i += 1;
            if (i < 100) {
                myLoop();
            } else {
                var g = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
                d3.select("#hashText").text(hashes[g]);
                // Returns true once every 100 times
                if (g == 36) {
                    d3.select("#errorTitle").text("Wow!");
                    d3.select("#errorHash").text("This hash worked! In theory, you just mined a coin! Right now, miners have to create an average of 5,785,327,100,000,000,000,000 (nearly six sextillion!)  hashes to get one that works. Good luck doing that again!")
                } else {
                    d3.select("#errorWrapper").style("visibility", "visible");
                    $("#errorHash").html("This hash is not valid. Right now, miners have to create an average of <span style='color:#2c8bdd; font-weight:600'> 5,785,327,100,000,000,000,000</span> (nearly six sextillion!)  hashes to get one that works. Try again!")
                }
            }
        }, 40);


    }
};