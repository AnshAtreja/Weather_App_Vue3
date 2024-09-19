import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      city: "",
      weatherData: [],
      loading: false,
      error: null,
      suggestions: [],
      isAuthenticated: false,
      userProfile: null,
    };
  },
  mutations: {
    setCity(state, city) {
      state.city = city;
    },
    setWeatherData(state, data) {
      state.weatherData = data;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
    setSuggestions(state, suggestions) {
      state.suggestions = suggestions;
    },
    clearSuggestions(state) {
      state.suggestions = [];
    },
    clearWeatherData(state) {
      state.weatherData = null;
      state.city = "";
      state.loading = false;
      state.error = null;
      state.suggestions = [];
    },
    setAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setUserProfile(state, profile) {
      state.userProfile = profile;
    },
    setMapCenter(state, coords) {
      state.mapCenter = coords;
    },
  },
  actions: {
    updateMapCenter({ commit }, { coords }) {
      commit("setMapCenter", [coords.lon, coords.lat]);
    },
    updateWeatherData({ commit }, weatherData) {
      commit("setWeatherData", weatherData);
    },
    async fetchSuggestions({ commit }, query) {
      if (query.trim().length > 2) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              query
            )}&limit=5`
          );

          const data = await response.json();
          commit("setSuggestions", data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        commit("clearSuggestions");
      }
    },

    async fetchWeather({ commit, state }) {
      commit("setLoading", true);
      commit("setError", null);
      commit("setWeatherData", null);
      try {
        const cityName = state.city;
        const currentDate = new Date().toISOString().split("T")[0];
        const visualCrossingKey = import.meta.env.VISUAL_CROSSING_API_KEY
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/${currentDate}?key=${visualCrossingKey}`
        );
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error("Please enter a valid city name");
          } else {
            throw new Error("Network response was not ok");
          }
        }
        const data = await response.json();
        commit("setWeatherData", data);
      } catch (error) {
        commit("setError", error.message);
        setTimeout(() => {
          commit("setError", null);
        }, 5000);
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchWeatherMock({ commit, state }) {
      commit("setLoading", true);
      commit("setError", null);
      commit("setWeatherData", null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (!state.city || state.city.trim().toLowerCase() === "invalid") {
          throw new Error("Please enter a valid city name");
        }

        const response = await fetch("/exampleResponse.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        commit("setWeatherData", data);
      } catch (error) {
        commit("setError", error.message);
        setTimeout(() => {
          commit("setError", null);
        }, 5000);
      } finally {
        commit("setLoading", false);
      }
    },
  },

  getters: {
    getCity: (state) => state.city,
    getWeatherData: (state) => state.weatherData,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    getName: (state) => state.userProfile,
    isAuthenticated: (state) => state.isAuthenticated,
    mapCenter: (state) => state.mapCenter,
  },
});

export default store;
