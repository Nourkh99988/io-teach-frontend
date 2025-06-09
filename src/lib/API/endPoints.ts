// API endpoints as direct URLs
export const endpointUrls = {
  slidersUrl:
    "/api/sliders?fields[0]=title&fields[1]=description&fields[2]=link&populate[photo][populate][image][fields][0]=url",
  clientsUrl:
    "/api/clients?fields[0]=name&fields[1]=position&fields[2]=paragraph&populate[photo][populate][image][fields][0]=url",
  teamUrl:
    "/api/team-members?fields[0]=name&fields[1]=postion&populate[photo][populate][image][fields][0]=url&populate[contacts]=*",
  servicesUrl: "/api/services?fields[0]=title&fields[1]=description&fields[2]=slug",
} as const;
