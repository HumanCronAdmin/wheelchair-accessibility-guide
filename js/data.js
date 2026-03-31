// Wheelchair Accessibility Data for Tokyo Locations
// Sources: JR East barrier-free info, Tokyo Metro accessibility pages,
//          venue official websites, GO TOKYO accessibility guide
// Last verified: 2026-03-31
//
// Rating criteria:
//   full    = Elevator access to all areas, accessible restrooms, no stairs required
//   partial = Some accessible facilities but may need assistance or have limited areas
//   limited = Major barriers, stairs only, or very limited accessibility

const SPOTS = [
  {
    name: "Tokyo Station",
    nameJa: "東京駅",
    category: "station",
    area: "Marunouchi",
    accessibility: "full",
    features: ["Elevators to all platforms","Accessible ticket gates on every floor","Wheelchair-accessible restrooms on multiple floors","Tactile paving throughout","Station staff assistance available","Wheelchair-accessible coin lockers","Slope access from Marunouchi side"],
    notes: "One of Tokyo's most accessible stations. Staff can provide portable ramps for train boarding. Request assistance at the manned ticket gate. Marunouchi side has the most barrier-free route.",
    officialUrl: "https://www.jreast.co.jp/e/stations/e1039.html"
  },
  {
    name: "Shinjuku Station",
    nameJa: "新宿駅",
    category: "station",
    area: "Shinjuku",
    accessibility: "partial",
    features: ["Elevators to JR platforms","Accessible ticket gates","Wheelchair-accessible restrooms","Tactile paving","Station staff assistance available"],
    notes: "Extremely large and complex station. Elevator routes exist but can be long and confusing. South Exit and New South Exit are the most accessible. Avoid rush hours (7:30-9:00, 17:30-19:30).",
    officialUrl: "https://www.jreast.co.jp/e/stations/e0792.html"
  },
  {
    name: "Shibuya Station",
    nameJa: "渋谷駅",
    category: "station",
    area: "Shibuya",
    accessibility: "partial",
    features: ["Elevators to JR platforms","Accessible ticket gates","Wheelchair-accessible restrooms","Tactile paving","Station staff assistance available"],
    notes: "Elevator access exists but routes between different lines (JR, Metro, Tokyu, Keio) can be complex. Hachiko Exit area is relatively accessible. Request staff assistance for transfers.",
    officialUrl: "https://www.jreast.co.jp/e/stations/e0784.html"
  },
  {
    name: "Ikebukuro Station",
    nameJa: "池袋駅",
    category: "station",
    area: "Ikebukuro",
    accessibility: "partial",
    features: ["Elevators to JR platforms","Accessible ticket gates","Wheelchair-accessible restrooms","Tactile paving","Station staff assistance available"],
    notes: "Large station with multiple exits. East Exit connects to Sunshine City via accessible underground passage. Request staff assistance at the manned ticket gate.",
    officialUrl: "https://www.jreast.co.jp/e/stations/e0167.html"
  },
  {
    name: "Ueno Station",
    nameJa: "上野駅",
    category: "station",
    area: "Ueno",
    accessibility: "full",
    features: ["Elevators to all platforms","Accessible ticket gates","Wheelchair-accessible restrooms","Tactile paving throughout","Station staff assistance available","Direct accessible connection to Ueno Park"],
    notes: "Well-equipped barrier-free station. Park Exit provides level access to Ueno Park and its museums. Staff assistance available for Shinkansen platform access.",
    officialUrl: "https://www.jreast.co.jp/e/stations/e0058.html"
  },
  {
    name: "Asakusa Station (Tokyo Metro)",
    nameJa: "浅草駅（東京メトロ）",
    category: "station",
    area: "Asakusa",
    accessibility: "partial",
    features: ["Elevator to platform","Accessible ticket gate","Wheelchair-accessible restroom","Tactile paving"],
    notes: "Older station with limited elevator locations. Exit 4 has elevator access. For Senso-ji, Exit 1 is closest but Exit 4 (elevator) may require a short outdoor detour.",
    officialUrl: "https://www.tokyometro.jp/en/station/asakusa/index.html"
  },
  {
    name: "Roppongi Station (Tokyo Metro)",
    nameJa: "六本木駅（東京メトロ）",
    category: "station",
    area: "Roppongi",
    accessibility: "partial",
    features: ["Elevator to Hibiya Line platform","Accessible ticket gate","Wheelchair-accessible restroom","Tactile paving"],
    notes: "Hibiya Line side has elevator access. Oedo Line platforms are very deep underground. Request assistance at the ticket gate.",
    officialUrl: "https://www.tokyometro.jp/en/station/roppongi/index.html"
  },
  {
    name: "Senso-ji Temple",
    nameJa: "浅草寺",
    category: "tourist",
    area: "Asakusa",
    accessibility: "partial",
    features: ["Flat approach through Nakamise-dori","Main hall accessible via side ramp","Paved paths in main areas"],
    notes: "The main approach through Kaminarimon gate and Nakamise-dori is flat and paved. The main hall has steps at the front but a wheelchair ramp is available on the side. Can be extremely crowded on weekends.",
    officialUrl: "https://www.senso-ji.jp/english/"
  },
  {
    name: "Meiji Shrine",
    nameJa: "明治神宮",
    category: "tourist",
    area: "Harajuku",
    accessibility: "partial",
    features: ["Gravel paths (compacted, wheelchair passable with effort)","Alternative paved route available","Accessible restroom near main shrine"],
    notes: "The main approach is a long gravel path. Wheelchair users can request vehicle access by speaking to staff at the entrance. Contact the shrine office in advance for best accessibility route.",
    officialUrl: "https://www.meijijingu.or.jp/en/"
  },
  {
    name: "Tokyo Tower",
    nameJa: "東京タワー",
    category: "tourist",
    area: "Minato",
    accessibility: "full",
    features: ["Elevator access to Main Deck (150m)","Wheelchair rental available (5 chairs)","Accessible restrooms on FootTown 1F, 2F, and Main Deck 2F","Accessible parking near entrance","Service dogs welcome","Disability discount available"],
    notes: "Barrier-free route from entrance to Main Deck elevator. Top Deck (250m) tour may have limited wheelchair access. Wheelchair reservations: 03-3433-5111.",
    officialUrl: "https://en.tokyotower.co.jp/"
  },
  {
    name: "Tokyo Skytree",
    nameJa: "東京スカイツリー",
    category: "tourist",
    area: "Sumida",
    accessibility: "full",
    features: ["Elevator access to observation decks","Wheelchair-accessible restrooms","Accessible entrance and ticket counter","Tokyo Solamachi fully accessible","Service dogs welcome","Wheelchair rental available"],
    notes: "Modern facility with universal design. Both Tembo Deck (350m) and Tembo Galleria (450m) are wheelchair accessible via elevator. Adjacent Tokyo Solamachi mall is also fully accessible.",
    officialUrl: "https://www.tokyo-skytree.jp/en/"
  },
  {
    name: "Imperial Palace East Gardens",
    nameJa: "皇居東御苑",
    category: "tourist",
    area: "Chiyoda",
    accessibility: "partial",
    features: ["Paved main paths","Accessible restrooms at entrance","Free admission"],
    notes: "Main paths are paved but some areas have slopes and uneven terrain. The Otemon (main gate) entrance is the most accessible. Closed Mondays and Fridays.",
    officialUrl: "https://www.kunaicho.go.jp/e-about/shisetsu/higashigyoen01.html"
  },
  {
    name: "Shinjuku Gyoen National Garden",
    nameJa: "新宿御苑",
    category: "tourist",
    area: "Shinjuku",
    accessibility: "partial",
    features: ["Paved main paths through gardens","Accessible restrooms","Service dogs welcome","Wheelchair-friendly greenhouse entrance"],
    notes: "Main paths are paved and relatively flat. The Japanese Garden section has some uneven stone paths. Shinjuku Gate is the most accessible entrance.",
    officialUrl: "https://fng.or.jp/shinjuku/en/"
  },
  {
    name: "Tokyo National Museum",
    nameJa: "東京国立博物館",
    category: "tourist",
    area: "Ueno",
    accessibility: "full",
    features: ["Elevators and ramps in all exhibition buildings","Wheelchair-accessible restrooms in all buildings","Wheelchair and cane rental at information counters","Free accessible parking (advance reservation)","Service dogs welcome","Sensory maps available"],
    notes: "All facilities and floors accessible except teahouses in the garden. Call 03-3822-1111 for parking reservation.",
    officialUrl: "https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en"
  },
  {
    name: "teamLab Borderless",
    nameJa: "チームラボボーダレス（麻布台ヒルズ）",
    category: "tourist",
    area: "Minato",
    accessibility: "partial",
    features: ["Elevator access to venue","Cane access permitted","Staff assistance available"],
    notes: "Wheelchair access via elevator, but some artworks are inaccessible for safety reasons. Number of wheelchair users admitted at one time is limited. Must be accompanied. Contact +81-(0)3-6230-9666 for details.",
    officialUrl: "https://www.teamlab.art/e/borderless-azabudai/"
  },
  {
    name: "Ueno Park",
    nameJa: "上野恩賜公園",
    category: "tourist",
    area: "Ueno",
    accessibility: "full",
    features: ["Paved wide paths throughout","Accessible restrooms at multiple locations","Level access from JR Ueno Station Park Exit","Multiple accessible museums within park"],
    notes: "Main paths are wide and paved. Level access from JR Ueno Station Park Exit. Some areas near Shinobazu Pond have steps. Cherry blossom season is extremely crowded.",
    officialUrl: "https://www.kensetsu.metro.tokyo.lg.jp/jimusho/toubuk/ueno/index_top.html"
  },
  {
    name: "Odaiba / DiverCity Tokyo",
    nameJa: "お台場 / ダイバーシティ東京",
    category: "tourist",
    area: "Odaiba",
    accessibility: "full",
    features: ["Modern accessible facilities throughout","Elevator access in all commercial buildings","Accessible restrooms","Yurikamome line fully accessible","Wide pedestrian walkways","Accessible waterfront promenade"],
    notes: "Modern entertainment district with universal design. Yurikamome monorail is fully accessible. DiverCity, Aqua City, and Decks Tokyo Beach malls are all accessible.",
    officialUrl: "https://www.gotokyo.org/en/destinations/southern-tokyo/odaiba/index.html"
  },
  {
    name: "Ginza District",
    nameJa: "銀座",
    category: "shopping",
    area: "Ginza",
    accessibility: "full",
    features: ["Flat, wide sidewalks","Department stores with elevators and accessible restrooms","Ginza Station has elevator access","Weekend pedestrian paradise (car-free main street)"],
    notes: "One of Tokyo's most accessible shopping districts. Major stores (Mitsukoshi, Matsuya, Wako) have elevators and accessible facilities. On weekends, Chuo-dori becomes pedestrian-only.",
    officialUrl: "https://www.gotokyo.org/en/destinations/central-tokyo/ginza/index.html"
  },
  {
    name: "Shibuya 109 / Center-gai Area",
    nameJa: "SHIBUYA109 / 渋谷センター街エリア",
    category: "shopping",
    area: "Shibuya",
    accessibility: "partial",
    features: ["Shibuya 109 has elevator access","Shibuya Scramble Square fully accessible","Accessible restrooms in major buildings","Curb cuts on main streets"],
    notes: "Newer buildings (Scramble Square, Stream, Hikarie) are fully accessible. Older buildings and smaller shops may have steps. Streets can be extremely crowded.",
    officialUrl: "https://www.gotokyo.org/en/destinations/western-tokyo/shibuya/index.html"
  },
  {
    name: "Akihabara Electric Town",
    nameJa: "秋葉原電気街",
    category: "shopping",
    area: "Akihabara",
    accessibility: "partial",
    features: ["JR Akihabara Station has elevator access","Yodobashi-Akiba is fully accessible","Main streets have curb cuts","Chuo-dori pedestrian-only on Sundays"],
    notes: "Large modern stores like Yodobashi Camera are fully accessible. Many smaller specialty shops have narrow entrances or stairs. Multi-story hobby shops may lack elevators.",
    officialUrl: "https://www.gotokyo.org/en/destinations/central-tokyo/akihabara/index.html"
  },
  {
    name: "Omotesando / Harajuku",
    nameJa: "表参道 / 原宿",
    category: "shopping",
    area: "Harajuku",
    accessibility: "partial",
    features: ["Omotesando boulevard has wide, flat sidewalks","Major brand stores are accessible","Omotesando Hills has elevator access","Curb cuts on main streets"],
    notes: "Omotesando Avenue is wide and flat, very wheelchair-friendly. Takeshita-dori is very crowded with a slope - difficult for wheelchairs. Laforet and Tokyu Plaza have elevator access.",
    officialUrl: "https://www.gotokyo.org/en/destinations/western-tokyo/harajuku/index.html"
  },
  {
    name: "Shinjuku Hotel District",
    nameJa: "新宿ホテルエリア",
    category: "hotel_area",
    area: "Shinjuku",
    accessibility: "full",
    features: ["Multiple accessible hotels (Hilton, Hyatt, Keio Plaza)","Accessible rooms with roll-in showers","Flat sidewalks in West Shinjuku","Connected to station via underground passages"],
    notes: "West Shinjuku has the highest concentration of accessible international hotels in Tokyo. Book accessible rooms well in advance. Underground walkways provide weather-protected accessible routes.",
    officialUrl: "https://www.gotokyo.org/en/destinations/western-tokyo/shinjuku/index.html"
  },
  {
    name: "Marunouchi / Tokyo Station Hotel Area",
    nameJa: "丸の内 / 東京駅ホテルエリア",
    category: "hotel_area",
    area: "Marunouchi",
    accessibility: "full",
    features: ["Modern accessible hotels (Four Seasons, Shangri-La, Tokyo Station Hotel)","Flat, wide sidewalks throughout","Direct accessible connection to Tokyo Station","Accessible underground passages"],
    notes: "One of Tokyo's most modern and accessible districts. KITTE and Marunouchi Building both have elevators and accessible restrooms. Direct barrier-free access from Tokyo Station Marunouchi Exit.",
    officialUrl: "https://www.gotokyo.org/en/destinations/central-tokyo/tokyo-station-and-marunouchi/index.html"
  },
  {
    name: "Odaiba Hotel Area",
    nameJa: "お台場ホテルエリア",
    category: "hotel_area",
    area: "Odaiba",
    accessibility: "full",
    features: ["Modern hotels with universal design (Hilton, Grand Nikko)","Flat terrain throughout","Yurikamome line fully accessible","Wide sidewalks and accessible waterfront paths"],
    notes: "Built with accessibility in mind. Hotels offer accessible rooms. The entire area is flat and easy to navigate. Yurikamome transit is fully accessible with elevators at all stations.",
    officialUrl: "https://www.gotokyo.org/en/destinations/southern-tokyo/odaiba/index.html"
  },
  {
    name: "Asakusa / Sumida Accommodation Area",
    nameJa: "浅草 / 墨田宿泊エリア",
    category: "hotel_area",
    area: "Asakusa",
    accessibility: "partial",
    features: ["Mix of modern accessible hotels and traditional ryokan","Flat streets in main tourist areas","Near Tokyo Skytree (fully accessible)","Some hotels offer accessible rooms"],
    notes: "Newer hotels generally have accessible rooms. Traditional ryokan typically have limited accessibility (step-up entrances, futon bedding, narrow corridors). Contact hotels directly to confirm. Streets around Senso-ji are flat but can be very crowded.",
    officialUrl: "https://www.gotokyo.org/en/destinations/eastern-tokyo/asakusa/index.html"
  }
];
