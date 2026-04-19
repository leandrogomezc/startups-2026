export function getClassesPath(locale: string) {
  return locale === "en" ? "/classes" : "/clases";
}

export function getCommunityPath(locale: string) {
  return locale === "en" ? "/community" : "/comunidad";
}

export function getRetoPath(locale: string) {
  return locale === "en" ? "/challenge" : "/reto";
}

export function getEventsPath(locale: string) {
  return "/events";
}

export function getResourcesPath(locale: string) {
  return locale === "en" ? "/resources" : "/recursos";
}
