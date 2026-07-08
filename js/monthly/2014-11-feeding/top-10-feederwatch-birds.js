$(function(){

var top25 = {};

top25.birds ={
	"U.S. and Canada": [{"name":"Black-capped/Carolina Chickadee","code":"y00033"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"House Finch","code":"houfin"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"American Robin","code":"amerob"}, {"name":"House Sparrow","code":"houspa"}],
	"Alabama": [{"name":"Mourning Dove","code":"moudov"}, {"name":"Carolina Chickadee","code":"carchi"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Carolina Wren","code":"carwre"}, {"name":"House Finch","code":"houfin"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Northern Mockingbird","code":"normoc"}],
	"Alaska": [{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Common Raven","code":"comrav"}, {"name":"Boreal Chickadee","code":"borchi"}, {"name":"Black-billed Magpie","code":"bkbmag"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Red-breasted Nuthatch","code":"rebnut"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"Common Redpoll","code":"comred"}, {"name":"Pine Grosbeak","code":"pingro"}],
	"Alberta": [{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Black-billed Magpie","code":"bkbmag"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Blue Jay","code":"blujay"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"House Sparrow","code":"houspa"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Red-breasted Nuthatch","code":"rebnut"}, {"name":"Northern Flicker","code":"norfli"}, {"name":"Hairy Woodpecker","code":"haiwoo"}],
	"Arizona": [{"name":"House Finch","code":"houfin"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Lesser Goldfinch","code":"lesgol"}, {"name":"House Sparrow","code":"houspa"}, {"name":"White-crowned Sparrow","code":"whcspa"}, {"name":"Anna's Hummingbird","code":"annhum"}, {"name":"Gambel's Quail","code":"gamqua"}, {"name":"Eurasian Collared-Dove","code":"eucdov"}, {"name":"Curve-billed Thrasher","code":"cubthr"}, {"name":"Gila Woodpecker","code":"gilwoo"}],
	"Arkansas":[{"name":"Northern Cardinal","code":"norcar"}, {"name":"Carolina Chickadee","code":"carchi"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Carolina Wren","code":"carwre"}, {"name":"American Robin","code":"amerob"}],
	"British Columbia":[{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Northern Flicker","code":"norfli"}, {"name":"Song Sparrow","code":"sonspa"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"American Robin","code":"amerob"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Spotted Towhee","code":"y00226"}, {"name":"House Finch","code":"houfin"}, {"name":"Varied Thrush","code":"varthr"}, {"name":"Red-breasted Nuthatch","code":"rebnut"}],
	"California":[{"name":"House Finch","code":"houfin"}, {"name":"Anna's Hummingbird","code":"annhum"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Western Scrub-Jay","code":"scrjay"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Lesser Goldfinch","code":"lesgol"}, {"name":"White-crowned Sparrow","code":"whcspa"}, {"name":"California Towhee","code":"caltow"}, {"name":"American Robin","code":"amerob"}, {"name":"Golden-crowned Sparrow","code":"gocspa"}],
	"Colorado": [{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Northern Flicker","code":"norfli"}, {"name":"House Finch","code":"houfin"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Eurasian Collared-Dove","code":"eucdov"}, {"name":"American Robin","code":"amerob"}, {"name":"House Sparrow","code":"houspa"}, {"name":"European Starling","code":"eursta"}, {"name":"Black-billed Magpie","code":"bkbmag"}],
	"Connecticut":[{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Blue Jay","code":"blujay"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}, {"name":"American Goldfinch","code":"amegfi"}],
	"Delaware": [{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Red-winged Blackbird","code":"rewbla"}, {"name":"House Finch","code":"houfin"}, {"name":"Carolina Chickadee","code":"y00033"}, {"name":"White-throated Sparrow","code":"whtspa"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Carolina Wren","code":"carwre"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}],
	"District of Columbia":[{"name":"House Sparrow","code":"houspa"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"House Finch","code":"houfin"}, {"name":"White-throated Sparrow","code":"whtspa"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Carolina Chickadee","code":"y00033"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Song Sparrow","code":"sonspa"}],
	"Florida":[{"name":"Northern Cardinal","code":"norcar"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}, {"name":"Northern Mockingbird","code":"normoc"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Yellow-rumped Warbler","code":"yerwar"}, {"name":"Carolina Wren","code":"carwre"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Gray Catbird","code":"grycat"}],
	"Georgia":[{"name":"Northern Cardinal","code":"norcar"}, {"name":"Carolina Chickadee","code":"carchi"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Carolina Wren","code":"carwre"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}, {"name":"House Finch","code":"houfin"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Blue Jay","code":"blujay"}],
	"Hawaii":[{"name":"Java Sparrow","code":"javspa"}, {"name":"Japanese White-eye","code":"jaweye"}, {"name":"Spotted Dove","code":"spodov"}, {"name":"House Sparrow","code":"houspa"}, {"name":"Zebra Dove","code":"zebdov"}, {"name":"Red-vented Bulbul","code":"revbul"}, {"name":"Red-billed Leiothrix","code":"reblei"}, {"name":"Saffron Finch","code":"saffin"}, {"name":"Common Waxbill","code":"comwax"}, {"name":"Common Myna","code":"commyn"}],
	"Idaho":[{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"House Finch","code":"houfin"}, {"name":"Northern Flicker","code":"norfli"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"American Robin","code":"amerob"}, {"name":"House Sparrow","code":"houspa"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"European Starling","code":"eursta"}, {"name":"Red-winged Blackbird","code":"rewbla"}],
	"Illinois":[{"name":"Northern Cardinal","code":"norcar"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"House Sparrow","code":"houspa"}, {"name":"House Finch","code":"houfin"}, {"name":"Carolina\/Black-capped Chickadee","code":"y00033"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Blue Jay","code":"blujay"}, {"name":"American Robin","code":"amerob"}],
	"Indiana":[{"name":"Northern Cardinal","code":"norcar"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Carolina\/Black-capped Chickadee","code":"y00033"}, {"name":"House Finch","code":"houfin"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}],
	"Iowa":[{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"House Sparrow","code":"houspa"}, {"name":"Blue Jay","code":"blujay"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"House Finch","code":"houfin"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}],
	"Kansas":[{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"House Sparrow","code":"houspa"}, {"name":"Blue Jay","code":"blujay"}, {"name":"House Finch","code":"houfin"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Carolina\/Black-capped Chickadee","code":"y00033"}, {"name":"American Robin","code":"amerob"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}],
	"Kentucky":[{"name":"Northern Cardinal","code":"norcar"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Carolina Chickadee","code":"carchi"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"House Finch","code":"houfin"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Carolina Wren","code":"carwre"}],
	"Louisiana":[{"name":"Northern Cardinal","code":"norcar"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}, {"name":"Northern Mockingbird","code":"normoc"}, {"name":"Carolina Wren","code":"carwre"}, {"name":"Red-winged Blackbird","code":"rewbla"}],
	"Maine":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"American Crow","code":"amecro"}],
	"Manitoba":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"House Sparrow","code":"houspa"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Black-billed Magpie","code":"bkbmag"}, {"name":"House Finch","code":"houfin"}, {"name":"American Goldfinch","code":"amegfi"}],
	"Maryland":[{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Carolina\/Black-capped Chickadee","code":"y00033"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Carolina Wren","code":"carwre"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"House Finch","code":"houfin"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}],
	"Massachusetts":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}],
	"Michigan":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Blue Jay","code":"blujay"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}, {"name":"House Finch","code":"houfin"}],
	"Minnesota":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}, {"name":"House Finch","code":"houfin"}],
	"Mississippi":[{"name":"American Goldfinch","code":"amegfi"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"House Finch","code":"houfin"}, {"name":"Carolina Chickadee","code":"carchi"}, {"name":"Carolina Wren","code":"carwre"}, {"name":"Northern Mockingbird","code":"normoc"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Chipping Sparrow","code":"chispa"}, {"name":"American Robin","code":"amerob"}],
	"Missouri":[{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Carolina\/Black-capped Chickadee","code":"y00033"}, {"name":"Blue Jay","code":"blujay"}, {"name":"American Robin","code":"amerob"}, {"name":"European Starling","code":"eursta"}, {"name":"House Finch","code":"houfin"}],
	"Montana":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Northern Flicker","code":"norfli"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"House Finch","code":"houfin"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Mountain Chickadee","code":"mouchi"}, {"name":"Black-billed Magpie","code":"bkbmag"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"House Sparrow","code":"houspa"}, {"name":"Eurasian Collared-Dove","code":"eucdov"}],
	"Nebraska":[{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"House Sparrow","code":"houspa"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"House Finch","code":"houfin"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"American Robin","code":"amerob"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"European Starling","code":"eursta"}, {"name":"White-breasted Nuthatch","code":"whbnut"}],
	"Nevada":[{"name":"House Finch","code":"houfin"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"House Sparrow","code":"houspa"}, {"name":"Lesser Goldfinch","code":"lesgol"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"White-crowned Sparrow","code":"whcspa"}, {"name":"American Robin","code":"amerob"}, {"name":"California Quail","code":"calqua"}, {"name":"Eurasian Collared-Dove","code":"eucdov"}, {"name":"European Starling","code":"eursta"}],
	"New Brunswick":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"American Crow","code":"amecro"}, {"name":"Purple Finch","code":"purfin"}, {"name":"European Starling","code":"eursta"}],
	"Newfoundland and Labrador":[{"name":"American Crow","code":"amecro"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"European Starling","code":"eursta"}, {"name":"Purple Finch","code":"purfin"}, {"name":"American Robin","code":"amerob"}, {"name":"Northern Flicker","code":"norfli"}, {"name":"Sharp-shinned Hawk","code":"shshaw"}],
	"New Hampshire":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"Northern Cardinal","code":"norcar"}],
	"New Jersey":[{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Carolina\/Black-capped Chickadee","code":"y00033"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"House Finch","code":"houfin"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}, {"name":"White-throated Sparrow","code":"whtspa"}],
	"New Mexico":[{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"House Finch","code":"houfin"}, {"name":"Northern Flicker","code":"norfli"}, {"name":"Western Scrub-Jay","code":"scrjay"}, {"name":"Mountain Chickadee","code":"mouchi"}, {"name":"American Robin","code":"amerob"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Eurasian Collared-Dove","code":"eucdov"}, {"name":"House Sparrow","code":"houspa"}, {"name":"White-winged Dove","code":"whwdov"}],
	"New York":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"House Finch","code":"houfin"}],
	"North Carolina":[{"name":"Carolina Chickadee","code":"carchi"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Carolina Wren","code":"carwre"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}, {"name":"House Finch","code":"houfin"}],
	"North Dakota":[{"name":"House Sparrow","code":"houspa"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Blue Jay","code":"blujay"}, {"name":"House Finch","code":"houfin"}, {"name":"Red-breasted Nuthatch","code":"rebnut"}, {"name":"American Goldfinch","code":"amegfi"}],
	"Northwest Territories": [{"name":"Common Redpoll","code":"comred"}, {"name":"Hoary Redpoll","code":"hoared"}, {"name":"Common Raven","code":"comrav"}, {"name":"Willow Ptarmigan","code":"wilpta"}, {"name":"Gray Jay","code":"gryjay"}, {"name":"Snow Bunting","code":"snobun"}, {"name":"House Sparrow","code":"houspa"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Boreal Chickadee","code":"borchi"}, {"name":"Black-billed Magpie","code":"bkbmag"}],
	"Nova Scotia":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Blue Jay","code":"blujay"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"European Starling","code":"eursta"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"American Crow","code":"amecro"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"Purple Finch","code":"purfin"}],
	"Ohio":[{"name":"Northern Cardinal","code":"norcar"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Carolina\/Black-capped Chickadee","code":"y00033"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"House Finch","code":"houfin"}, {"name":"House Sparrow","code":"houspa"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}],
	"Oklahoma":[{"name":"Northern Cardinal","code":"norcar"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Carolina Chickadee","code":"carchi"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"House Finch","code":"houfin"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Blue Jay","code":"blujay"}, {"name":"House Sparrow","code":"houspa"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}],
	"Ontario":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"European Starling","code":"eursta"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"White-breasted Nuthatch","code":"whbnut"}],
	"Oregon":[{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Northern Flicker","code":"norfli"}, {"name":"Spotted Towhee","code":"y00226"}, {"name":"House Finch","code":"houfin"}, {"name":"American Robin","code":"amerob"}, {"name":"Western Scrub-Jay","code":"scrjay"}, {"name":"Anna's Hummingbird","code":"annhum"}, {"name":"Song Sparrow","code":"sonspa"}, {"name":"European Starling","code":"eursta"}],
	"Pennsylvania":[{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Carolina\/Black-capped Chickadee","code":"y00033"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Blue Jay","code":"blujay"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"House Finch","code":"houfin"}, {"name":"White-breasted Nuthatch","code":"whbnut"}],
	"Prince Edward Island":[{"name":"Blue Jay","code":"blujay"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"American Crow","code":"amecro"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"European Starling","code":"eursta"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"American Robin","code":"amerob"}, {"name":"Hairy Woodpecker","code":"haiwoo"}],
	"Quebec":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"American Crow","code":"amecro"}],
	"Rhode Island":[{"name":"Northern Cardinal","code":"norcar"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Carolina Wren","code":"carwre"}, {"name":"American Goldfinch","code":"amegfi"}],
	"Saskatchewan":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"House Sparrow","code":"houspa"}, {"name":"Black-billed Magpie","code":"bkbmag"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Red-breasted Nuthatch","code":"rebnut"}, {"name":"Northern Flicker","code":"norfli"}],
	"South Carolina":[{"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Carolina Chickadee","code":"carchi"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Carolina Wren","code":"carwre"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"House Finch","code":"houfin"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Downy Woodpecker","code":"dowwoo"}],
	"South Dakota":[{"name":"House Sparrow","code":"houspa"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Blue Jay","code":"blujay"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"European Starling","code":"eursta"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"American Robin","code":"amerob"}, {"name":"House Finch","code":"houfin"}],
	"Tennessee":[{"name":"Northern Cardinal","code":"norcar"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Carolina Chickadee","code":"carchi"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Blue Jay","code":"blujay"}, {"name":"American Robin","code":"amerob"}, {"name":"Carolina Wren","code":"carwre"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"House Finch","code":"houfin"}],
	"Texas":[{"name":"Northern Cardinal","code":"norcar"}, {"name":"Carolina Chickadee","code":"carchi"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"House Finch","code":"houfin"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"House Sparrow","code":"houspa"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Northern Mockingbird","code":"normoc"}, {"name":"White-winged Dove","code":"whwdov"}, {"name":"Carolina Wren","code":"carwre"}],
	"Utah":[{"name":"House Finch","code":"houfin"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"American Robin","code":"amerob"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Eurasian Collared-Dove","code":"eucdov"}, {"name":"House Sparrow","code":"houspa"}, {"name":"European Starling","code":"eursta"}, {"name":"Northern Flicker","code":"norfli"}, {"name":"Downy Woodpecker","code":"dowwoo"}],
	"Vermont":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Northern Cardinal","code":"norcar"}],
	"Virginia":[{"name":"Carolina\/Black-capped Chickadee","code":"y00033"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Carolina Wren","code":"carwre"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"House Finch","code":"houfin"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}],
	"Washington":[{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Northern Flicker","code":"norfli"}, {"name":"Song Sparrow","code":"sonspa"}, {"name":"Spotted Towhee","code":"y00226"}, {"name":"House Finch","code":"houfin"}, {"name":"Anna's Hummingbird","code":"annhum"}, {"name":"American Robin","code":"amerob"}, {"name":"Steller's Jay","code":"stejay"}, {"name":"Chestnut-backed Chickadee","code":"chbchi"}],
	"West Virginia":[{"name":"Tufted Titmouse","code":"tuftit"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Carolina\/Black-capped Chickadee","code":"y00033"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Carolina Wren","code":"carwre"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}, {"name":"American Goldfinch","code":"amegfi"}],
	"Wisconsin":[{"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Dark-eyed Junco","code":"daejun"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"White-breasted Nuthatch","code":"whbnut"}, {"name":"Mourning Dove","code":"moudov"}, {"name":"Northern Cardinal","code":"norcar"}, {"name":"Blue Jay","code":"blujay"}, {"name":"Red-bellied Woodpecker","code":"rebwoo"}, {"name":"Hairy Woodpecker","code":"haiwoo"}],
	"Wyoming":[{"name":"Dark-eyed Junco","code":"daejun"}, {"name":"House Finch","code":"houfin"}, {"name":"Eurasian Collared-Dove","code":"eucdov"}, {"name":"American Goldfinch","code":"amegfi"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"House Sparrow","code":"houspa"}, {"name":"Northern Flicker","code":"norfli"}, {"name":"American Robin","code":"amerob"}, {"name":"Pine Siskin","code":"pinsis"}, {"name":"European Starling","code":"eursta"}],
	"Yukon Territory":[{"name":"Pine Grosbeak","code":"pingro"}, {"name":"Common Redpoll","code":"comred"}, {"name":"Black-capped Chickadee","code":"bkcchi"}, {"name":"Boreal Chickadee","code":"borchi"}, {"name":"Hairy Woodpecker","code":"haiwoo"}, {"name":"Red Crossbill","code":"redcro"}, {"name":"Black-billed Magpie","code":"bkbmag"}, {"name":"Gray Jay","code":"gryjay"}, {"name":"Downy Woodpecker","code":"dowwoo"}, {"name":"Bohemian Waxwing","code":"bohwax"}]
	
	
};


top25.regionAssignment = {
	"U.S. and Canada":'na',
	"Alabama": 'us',
	"Alaska": 'us',
	"Alberta": 'ca',
	"Arizona": 'us',
	"Arkansas": 'us',
	"British Columbia": 'ca',
	"California": 'us',
	"Colorado": 'us',
	"Connecticut": 'us',
	"Delaware": 'us',
	"District of Columbia": 'us',
	"Florida": 'us',
	"Georgia":'us',
	"Hawaii": 'us',
	"Idaho": 'us',
	"Illinois":'us',
	"Indiana":'us',
	"Iowa":'us',
	"Kansas":'us',
	"Kentucky":'us',
	"Louisiana":'us',
	"Maine":'us',
	"Manitoba":'ca',
	"Maryland": 'us',
	"Massachusetts":'us',
	"Michigan":'us',
	"Minnesota":'us',
	"Mississippi":'us',
	"Missouri":'us',
	"Montana":'us',
	"Nebraska":'us',
	"Nevada":'us',
	"New Brunswick":'ca',
	"Newfoundland and Labrador": 'ca',
	"New Hampshire":'us',
	"New Jersey":'us',
	"New Mexico":'us',
	"New York":'us',
	"North Carolina":'us',
	"North Dakota":'us',
	"Northwest Territories":'ca',
	"Nova Scotia":'ca',
	"Nunavut":'ca',
	"Ohio":'us',
	"Oklahoma":'us',
	"Ontario":'ca',
	"Oregon":'us',
	"Pennsylvania":'us',
	"Prince Edward Island":'ca',
	"Quebec":'ca',
	"Rhode Island":'us',
	"Saskatchewan":'ca',
	"South Carolina":'us',
	"South Dakota":'us',
	"Tennessee":'us',
	"Texas":'us',
	"Utah":'us',
	"Vermont":'us',
	"Virginia":'us',
	"Washington":'us',
	"West Virginia":'us',
	"Wisconsin":'us',
	"Wyoming":'us',
	"Yukon Territory":'ca'
};

top25.abbr = {
	"U.S. and Canada":'na',
	"Alabama": 'al',
	"Alaska": 'ak',
	"Alberta": 'ab',
	"Arizona": 'az',
	"Arkansas": 'ar',
	"British Columbia": 'bc',
	"California": 'ca',
	"Colorado": 'co',
	"Connecticut": 'ct',
	"Delaware": 'de',
	"District of Columbia": 'dc',
	"Florida": 'fl',
	"Georgia":'ga',
	"Hawaii": 'hi',
	"Idaho": 'id',
	"Illinois":'il',
	"Indiana":'in',
	"Iowa":'ia',
	"Kansas":'ks',
	"Kentucky":'ky',
	"Louisiana":'la',
	"Maine":'me',
	"Manitoba":'mb',
	"Maryland": 'md',
	"Massachusetts":'ma',
	"Michigan":'mi',
	"Minnesota":'mn',
	"Mississippi":'ms',
	"Missouri":'mo',
	"Montana":'mt',
	"Nebraska":'ne',
	"Nevada":'nv',
	"New Brunswick":'nb',
	"Newfoundland and Labrador": 'nl',
	"New Hampshire":'nh',
	"New Jersey":'nj',
	"New Mexico":'nm',
	"New York":'ny',
	"North Carolina":'nc',
	"North Dakota":'nd',
	"Northwest Territories":'nt',
	"Nova Scotia":'ns',
	"Nunavut":'nu',
	"Ohio":'oh',
	"Oklahoma":'ok',
	"Ontario":'on',
	"Oregon":'or',
	"Pennsylvania":'pa',
	"Prince Edward Island":'pei',
	"Quebec":'qu',
	"Rhode Island":'ri',
	"Saskatchewan":'sa',
	"South Carolina":'sc',
	"South Dakota":'sd',
	"Tennessee":'tn',
	"Texas":'tx',
	"Utah":'ut',
	"Vermont":'vt',
	"Virginia":'va',
	"Washington":'wa',
	"West Virginia":'wv',
	"Wisconsin":'wi',
	"Wyoming":'wy',
	"Yukon Territory":'yt'
};

top25.letters = {
	"U.S. and Canada":'na',
	"Alabama": 'B',
	"Alaska": 'A',
	"Alberta": 'a',
	"Arizona": 'D',
	"Arkansas": 'C',
	"British Columbia": 'b',
	"California": 'E',
	"Colorado": 'F',
	"Connecticut": 'G',
	"Delaware": 'H',
	"District of Columbia": 'y',
	"Florida": 'I',
	"Georgia":'J',
	"Hawaii": 'K',
	"Idaho": 'M',
	"Illinois":'N',
	"Indiana":'O',
	"Iowa":'L',
	"Kansas":'P',
	"Kentucky":'Q',
	"Louisiana":'R',
	"Maine":'U',
	"Manitoba":'c',
	"Maryland": 'T',
	"Massachusetts":'S',
	"Michigan":'V',
	"Minnesota":'W',
	"Mississippi":'Y',
	"Missouri":'X',
	"Montana":'Z',
	"Nebraska":'c',
	"Nevada":'g',
	"New Brunswick":'d',
	"Newfoundland and Labrador": 'e',
	"New Hampshire":'d',
	"New Jersey":'e',
	"New Mexico":'f',
	"New York":'h',
	"North Carolina":'a',
	"North Dakota":'b',
	"Northwest Territories":'f',
	"Nova Scotia":'g',
	"Nunavut":'h',
	"Ohio":'i',
	"Oklahoma":'j',
	"Ontario":'i',
	"Oregon":'k',
	"Pennsylvania":'l',
	"Prince Edward Island":'j',
	"Quebec":'k',
	"Rhode Island":'m',
	"Saskatchewan":'l',
	"South Carolina":'n',
	"South Dakota":'o',
	"Tennessee":'p',
	"Texas":'q',
	"Utah":'r',
	"Vermont":'t',
	"Virginia":'s',
	"Washington":'u',
	"West Virginia":'w',
	"Wisconsin":'v',
	"Wyoming":'x',
	"Yukon Territory":'m'
};

top25.regions = ["U.S. and Canada","Alabama","Alaska","Alberta","Arizona","Arkansas","British Columbia","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Manitoba","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Brunswick","Newfoundland and Labrador","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northwest Territories","Nova Scotia","Ohio","Oklahoma","Ontario","Oregon","Pennsylvania","Prince Edward Island","Quebec","Rhode Island","Saskatchewan","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","Yukon Territory"];


top25.settings = {
	col_width: 50,
	row_height: 50,
	birdCol_width: 200,
	birdColl_padding: 50
}

$wrapper = $('#bird-wrapper');

$wrapper.css('width',top25.regions.length * top25.settings.col_width + 'px');


var positionCounter = 1;

Handlebars.registerHelper('position', function() {
	if (positionCounter > 10) {
		positionCounter = 1;
	}
    return positionCounter++;
});

var source   = $("#bird-template").html();
var template = Handlebars.compile(source);

var context,html,wrapper;

var $viz = $('#bird-wrapper');

for (var i =0,l=top25.regions.length;i<l;i++){
	wrapper  = {birds: top25.birds[top25.regions[i]]};
	context = {
		region : top25.regions[i],
		abbr: top25.abbr[top25.regions[i]],
		birds: top25.birds[top25.regions[i]],
		country: top25.regionAssignment[top25.regions[i]],
		letter: top25.letters[top25.regions[i]]
	};
	html = template(context);
	$viz.append(html);
}



/*
$('.region').affix({
	  offset: {
	    top: $('#bird-wrapper').offset().top -25
	  }
	 }
	);
*/

var birds = $('.bird-by-region'),
	states = $('.region'),
	bregions = $('.bird-by-region');
	
var wrap_width = top25.regions.length * top25.settings.col_width;

states.on('click',function(){
	var that = $(this),
		parent = that.parent();
	
	if (!parent.hasClass('active')) {
		$wrapper.animate({'width':wrap_width + 'px'},200);
		bregions.removeClass('active');
		birds.css('width','50px');
		states.css('width','50px');
		that.animate({'width':'250px'},200);
		parent.animate({'width':'250px'},200).addClass('active');
		$wrapper.animate({'width':(wrap_width + 250) + 'px'},200);
		$('#clear').removeClass('disabled');
	} else {
		bregions.removeClass('active');
		birds.css('width','50px');
		states.css('width','50px');
		$('#clear').addClass('disabled');
		$wrapper.animate({'width':wrap_width + 'px'},200);
	}
	
	birds.find('img').each(function(){
		var that = $(this);
		that.css('opacity',1);
	});

});


birds.on('click','img',function(){
	$('.active .region').click();
	var code = $(this).data('code');
	birds.find('img').each(function(){
		var that = $(this);
		that.css('opacity',1);
		if (that.data('code') != code) {
			that.css('opacity',.1);
		}
	});
	$('#clear').removeClass('disabled');
	
});

setTimeout(function(){
	$('#bird-wrapper .bird-by-region:eq(0) .region').trigger('click');
},500);

$('#clear').on('click',function(){
	birds.find('img').each(function(){
		var that = $(this);
		that.css('opacity',1);
	});
	$('.active .region').click();
	$(this).addClass('disabled');
	return false;
});

/*
$.ajax({
	url: '/citsci/wp-content/themes/CitSciMonthly2.1/css/region-fonts.css',
	beforeSend: function ( xhr ) {
	  xhr.overrideMimeType("application/octet-stream");
	},
	success: function(data) {
	  $("<link />", {
	    'rel': 'stylesheet',
	    'href': '/citsci/wp-content/themes/CitSciMonthly2.1/css/region-fonts.css'
	  }).appendTo('head');
	}
});
*/



});