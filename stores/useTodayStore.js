import { create } from "zustand";

const useTodayStore = create((set, get) => ({
  // default empty menu — will be populated by fetchMessMenu
  messMenu: {
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
  },

  // metadata for remote mess menu
  messMenuDate: null,
  loadingMessMenu: false,
  messMenuError: null,
  // timings returned by API (e.g. { breakfast: '7:30 am - 9:30 am', ... })
  messMenuTimings: {},
  // raw array from API
  rawTodaysMenu: [],

  // Fetch mess menu from remote API for a given date (YYYY-MM-DD)
  fetchMessMenu: async (date, token) => {
    set({ loadingMessMenu: true, messMenuError: null });
    try {
      const url = `https://rishiverse-api.rishihood.edu.in/api/v1/mess?date=${date}`;
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(url, { method: "GET", headers });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          `Failed to fetch mess menu: ${res.status} ${res.statusText} - ${text}`
        );
      }

      const body = await res.json();

      // Normalize response into { breakfast: [], lunch: [], snacks: [], dinner: [] }
      let newMenu = { breakfast: [], lunch: [], snacks: [], dinner: [] };
      let newTimings = {};

      // capture raw todaysmenu if provided
      const rawMenuArray =
        body && (body.todaysmenu || body.data?.todaysmenu || []);

      if (Array.isArray(rawMenuArray) && rawMenuArray.length > 0) {
        // keep raw list
        // we'll still prefer groupedMenu if present for clean grouping
      }

      const pick = (obj, key) =>
        obj && Object.prototype.hasOwnProperty.call(obj, key)
          ? obj[key]
          : undefined;

      // Handle the specific API shape seen in examples: { groupedMenu: {...}, timings: {...}, todaysmenu: [...] }
      if (body && body.groupedMenu) {
        const gm = body.groupedMenu;
        const mapKey = (k) => k && String(k).toLowerCase();
        // map common keys to our internal keys
        const mapping = {
          breakfast: ["breakfast"],
          lunch: ["lunch"],
          snacks: ["snacks", "snack"],
          dinner: ["dinner"],
        };

        Object.keys(mapping).forEach((ourKey) => {
          const possible = mapping[ourKey];
          for (let i = 0; i < possible.length; i++) {
            const pk = possible[i];
            // check both uppercase and lowercase variants in groupedMenu
            if (gm[pk.toUpperCase()]) {
              newMenu[ourKey] = gm[pk.toUpperCase()];
              break;
            }
            if (gm[pk]) {
              newMenu[ourKey] = gm[pk];
              break;
            }
          }
        });
        // timings
        if (body.timings) {
          Object.keys(body.timings).forEach((k) => {
            const lk = String(k).toLowerCase();
            if (
              ["breakfast", "lunch", "dinner", "snacks", "snack"].includes(lk)
            ) {
              const key = lk === "snack" ? "snacks" : lk;
              newTimings[key] = body.timings[k];
            }
          });
        }
      } else if (body && (body.breakfast || body.lunch || body.dinner)) {
        newMenu.breakfast = pick(body, "breakfast") || [];
        newMenu.lunch = pick(body, "lunch") || [];
        newMenu.dinner = pick(body, "dinner") || [];
      } else if (
        body &&
        body.data &&
        (body.data.breakfast || body.data.lunch || body.data.dinner)
      ) {
        newMenu.breakfast = pick(body.data, "breakfast") || [];
        newMenu.lunch = pick(body.data, "lunch") || [];
        newMenu.dinner = pick(body.data, "dinner") || [];
      } else if (body && body.menu) {
        // flexible: menu may contain meals keyed by name
        newMenu.breakfast =
          pick(body.menu, "breakfast") || pick(body.menu, "Breakfast") || [];
        newMenu.lunch =
          pick(body.menu, "lunch") || pick(body.menu, "Lunch") || [];
        newMenu.dinner =
          pick(body.menu, "dinner") || pick(body.menu, "Dinner") || [];
      } else if (Array.isArray(body)) {
        // if array, try to group by mealType property
        const arr = body;
        newMenu = {
          breakfast: arr.filter(
            (i) => i.meal === "breakfast" || i.meal === "Breakfast"
          ),
          lunch: arr.filter((i) => i.meal === "lunch" || i.meal === "Lunch"),
          dinner: arr.filter((i) => i.meal === "dinner" || i.meal === "Dinner"),
        };
      } else if (body && body.data && Array.isArray(body.data)) {
        const arr = body.data;
        newMenu = {
          breakfast: arr.filter(
            (i) => i.meal === "breakfast" || i.meal === "Breakfast"
          ),
          lunch: arr.filter((i) => i.meal === "lunch" || i.meal === "Lunch"),
          dinner: arr.filter((i) => i.meal === "dinner" || i.meal === "Dinner"),
        };
      } else {
        // unknown shape: try to use entire body as lunch for visibility
        newMenu.lunch = body && body.items ? body.items : [];
      }

      // Ensure array items have name/rating/reviews fallback
      const normalizeItems = (list) =>
        Array.isArray(list)
          ? list.map((i) => {
              if (typeof i === "string")
                return { name: i, rating: 0, reviews: 0 };
              return {
                name: i.name || i.menuItems || i.item || i.title || String(i),
                rating: i.rating || 0,
                reviews: i.reviews || 0,
              };
            })
          : [];

      const finalMenu = {
        breakfast: normalizeItems(newMenu.breakfast),
        lunch: normalizeItems(newMenu.lunch),
        snacks: normalizeItems(newMenu.snacks || []),
        dinner: normalizeItems(newMenu.dinner),
      };

      set({
        messMenu: finalMenu,
        messMenuTimings: newTimings,
        rawTodaysMenu: Array.isArray(rawMenuArray)
          ? rawMenuArray
          : body.todaysmenu || [],
        messMenuDate: date,
        loadingMessMenu: false,
        messMenuError: null,
      });
      return { success: true };
    } catch (err) {
      set({ loadingMessMenu: false, messMenuError: err.message });
      return { success: false, error: err.message };
    }
  },

  todaysEvents: [
    {
      id: 1,
      title: "AI & Machine Learning Workshop",
      time: "7:00 PM",
      location: "Room 301, CS Building",
      description: "Introduction to Neural Networks and Deep Learning",
      category: "Academic",
      attendees: 23,
      maxAttendees: 40,
    },
    {
      id: 2,
      title: "Midterm Study Group",
      time: "6:00 PM",
      location: "Central Library, Study Room 5",
      description: "CS 301 Data Structures - Group Study Session",
      category: "Study",
      attendees: 12,
      maxAttendees: 15,
    },
    {
      id: 3,
      title: "Photography Club Exhibition",
      time: "5:00 PM",
      location: "Art Gallery, Main Campus",
      description: "Student Photography Exhibition - Theme: Campus Life",
      category: "Arts",
      attendees: 18,
      maxAttendees: 30,
    },
    {
      id: 4,
      title: "Cricket Match - CS vs ME",
      time: "4:00 PM",
      location: "Sports Ground",
      description: "Inter-department Cricket Championship Finals",
      category: "Sports",
      attendees: 45,
      maxAttendees: 100,
    },
    {
      id: 5,
      title: "Career Guidance Session",
      time: "3:00 PM",
      location: "Auditorium",
      description: "Placement Preparation Workshop by Industry Experts",
      category: "Career",
      attendees: 67,
      maxAttendees: 100,
    },
  ],

  yearCountdown: {
    daysLeft: 45,
    message: "Midterms in 3 weeks!",
    actionText: "Check out study resources",
    resources: [
      "CS 301 Study Guide",
      "Library Database Access",
      "Peer Study Groups",
    ],
  },

  userPreferences: {
    dietaryRestrictions: [],
    favoriteEvents: [],
    notifications: true,
  },

  rateMenuItem: (mealType, itemIndex, rating) => {
    set((state) => ({
      messMenu: {
        ...state.messMenu,
        [mealType]: state.messMenu[mealType].map((item, index) =>
          index === itemIndex
            ? {
                ...item,
                rating: (item.rating + rating) / 2,
                reviews: item.reviews + 1,
              }
            : item
        ),
      },
    }));
  },

  rsvpEvent: (eventId) => {
    set((state) => ({
      todaysEvents: state.todaysEvents.map((event) =>
        event.id === eventId
          ? { ...event, attendees: event.attendees + 1 }
          : event
      ),
    }));
  },

  updatePreferences: (preferences) => {
    set((state) => ({
      userPreferences: { ...state.userPreferences, ...preferences },
    }));
  },
}));

export default useTodayStore;
