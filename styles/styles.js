import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background,
  },
  button: {
    backgroundColor: '#FF8100',
    borderColor: '#FF8100',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  question: {
    fontSize: 32,
    fontWeight: '600',
    padding: 24,
  },
  input: {
    margin: 12,
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 10,
    paddingTop: 11,
    borderRadius: 6,
    borderColor: colors.textInputBorder,
    fontSize: 18,
    backgroundColor: colors.textInputColor,
    color: colors.text,
  },
  subtitle: {
    fontSize: 18,
    paddingVertical: 8,
    color: colors.text,
  },
  cardLight: {
    borderRadius: 20,
    paddingBottom: 100,
    borderWidth: 1,
  },
  linearView: {
    borderRadius: 20,
  },
  lightCounterText: {
    paddingTop: 20,
    textAlign: 'center',
    padding: 24,
    fontSize: 22,
    fontWeight: '500',
    color: 'white',
  },
  lightCounter: {
    fontSize: 60,
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
  swiper: {
    height: 700,
  },
  slides: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  cardTitle: {
    padding: 24,
    paddingHorizontal: 24,
    textAlign: 'center',
    fontSize: 36,
    color: 'darkgray',
    fontWeight: '300',
  },
  homeTitle: {
    paddingTop: 24,
    paddingHorizontal: 24,
    textAlign: 'center',
    fontSize: 36,
    color: '#FF8100',
    fontWeight: '300',
  },
  homeImage: {
    height: 200,
    width: 200,
  },
  homeOuterContainer: {
    flex: 1,
    padding: 24,
  },
  homeSubtitle: {
    fontSize: 24,
    padding: 40,
    textAlign: 'center',
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'darkgray',
  },
  newEntryInfo: {
    color: colors.subtext,
    fontSize: 18,
    paddingBottom: 20,
  },
  logOut: {
    backgroundColor: '#FF8100',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'darkgray',
    paddingBottom: 30,
  },
  settingsInfo: {
    color: 'darkgray',
    fontSize: 18,
    paddingBottom: 10,
  },
  previousEntryItem: {
    padding: 20,
    borderColor: colors.listBorder,
    borderWidth: 1,
    borderBottomColor: colors.background,
    backgroundColor: colors.background,
  },
});