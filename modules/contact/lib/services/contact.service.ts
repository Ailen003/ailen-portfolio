import { contactDataMap } from "../data/contact.data"
import type { ContactData } from "../types/contact.types"

export function getContactData(locale: string): ContactData {
  return contactDataMap[locale] ?? contactDataMap["en"]
}
