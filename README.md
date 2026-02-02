# Task overview

[Video here]

# Tech stack
- Expo (Starter template)
- React query (mock api)
- Typescript 
- Reanimated

# Implemented
- Car carousel using provided data through a mock api
   - Overflowing carousel
   - Centering items inbetween first/last element. First & last hug the sides
- Car carousel card animations
- Pagination indicator & animations "crawling" indicator moving & resizing scale between indexes
- Shine animation for text to indicate importance, decided to scrap because it looked cheap.

# Not completed
- Loading state not complete for the carousel, currently renders same blurhash image but has slight snapping when loading in rest of the content. I would add proper loading elements for text & images to match real content. Add blurhash for all images. 

# Explored
- Spent some time trying to see if I could get smooth image transitions between routes. In the time frame could not get static feature flag for reanimated's experimental shared element transition working. Not sure if not supported with expo without ejections since required pod install. Also looked into expo's upcoming Apple.Zoom feature that could solve this but not available before v55 (currently 54).

# Work time for task completion
