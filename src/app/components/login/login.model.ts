export interface Login {
  username: string,
  password: string,
}

export interface Cadastro {
  name: string,
  email: string,
  phone: string,
  password: string
}

export interface Store {
  name: string,
  logoUrl: string,
  bannerUrl: string,
  address: Localization
}

export interface Localization {
  street: string,
  complement: string,
  neighborhood: string,
  city: string,
  state: string,
  country: string,
  longitude: number,
  latitude: number
}
