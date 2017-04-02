import { VariableLookup, ResultTreeUnit, UnitLookup } from '../types'
import valueWrap from './value-wrap'

const defaultVariables: VariableLookup = {
    // ========================================================================
    // Mathematical constants
    // ========================================================================

    'e':        valueWrap(Math.E),
    'pi':       valueWrap(Math.PI),
    'π':        valueWrap(Math.PI),
    'phi':      valueWrap(1.618033988749895),
    'φ':        valueWrap(1.618033988749895),

    // ========================================================================
    // Physical constants
    // ========================================================================

    'g_0':      unitWrap(9.80665,       { m: 1, s: -2 }),           // gravity of Earth
    'G':        unitWrap(6.67408e-11,   { m: 3, kg: -1, s: -2 }),   // Gravitational constant

    // ========================================================================
    // Length
    // ========================================================================

    // SI ---------------------------------------------------------------------
    'pm':       unitWrap(1e-12,         { m: 1 }),      // picometer
    'nm':       unitWrap(1e-9,          { m: 1 }),      // nanometer
    'μm':       unitWrap(1e-6,          { m: 1 }),      // micrometer
    'mm':       unitWrap(1e-3,          { m: 1 }),      // millimeter
    'cm':       unitWrap(1e-2,          { m: 1 }),      // centimeter
    'dm':       unitWrap(1e-1,          { m: 1 }),      // decimeter
    'm':        unitWrap(1e0,           { m: 1 }),      // meter (base unit)
    'km':       unitWrap(1e3,           { m: 1 }),      // kilometer
    'Mm':       unitWrap(1e6,           { m: 1 }),      // megameter
    'Gm':       unitWrap(1e9,           { m: 1 }),      // gigameter

    // Imperial ---------------------------------------------------------------
    'thou':     unitWrap(2.54e-7,       { m: 1 }),      // thou, 1/1000 inch
    'mil':      unitWrap(2.54e-7,       { m: 1 }),      // mil, 1/1000 inch
    'in':       unitWrap(2.54e-2,       { m: 1 }),      // inch
    '"':        unitWrap(2.54e-2,       { m: 1 }),      // inch, " symbol
    'ft':       unitWrap(0.3048,        { m: 1 }),      // foot
    '\'':       unitWrap(0.3048,        { m: 1 }),      // foot, ' symbol
    'yd':       unitWrap(0.9144,        { m: 1 }),      // yard
    'mi':       unitWrap(1609.344,      { m: 1 }),      // mile

    // Others -----------------------------------------------------------------
    'NM':       unitWrap(1852,          { m: 1 }),      // natical mile
    'nmi':      unitWrap(1852,          { m: 1 }),      // natical mile
    'Å':        unitWrap(1e-10,         { m: 1 }),      // ångström
    'AU':       unitWrap(1.4959787e11,  { m: 1 }),      // astronomical unit
    'ly':       unitWrap(9.4607305e15,  { m: 1 }),      // light year
    'pc':       unitWrap(3.0856776e16,  { m: 1 }),      // parsec

    // ========================================================================
    // Area
    // ========================================================================

    // Imperial ---------------------------------------------------------------
    'ac':       unitWrap(4046.856,      { m: 2 }),      // acre (international)

    // Others -----------------------------------------------------------------
    'ha':       unitWrap(1e4,           { m: 2 }),      // hectare
    'b':        unitWrap(1e-28,         { m: 2 }),      // barn (physics)

    // ========================================================================
    // Volume
    // ========================================================================

    // SI ---------------------------------------------------------------------
    'μL':       unitWrap(1e-9,          { m: 3 }),      // microliter
    'mL':       unitWrap(1e-6,          { m: 3 }),      // milliliter
    'cL':       unitWrap(1e-5,          { m: 3 }),      // centiliter
    'dL':       unitWrap(1e-4,          { m: 3 }),      // deciliter
    'L':        unitWrap(1e-3,          { m: 3 }),      // liter

    // Imperial ---------------------------------------------------------------
    'pt':       unitWrap(5.68e-4,       { m: 3 }),      // pint (imperial)
    'qt':       unitWrap(1.13652e-3,    { m: 3 }),      // quart (imperial)
    'gal':      unitWrap(4.54609e-3,    { m: 3 }),      // gallon (imperial)

    'pt_l':     unitWrap(4.73e-4,       { m: 3 }),      // pint (US liquid)
    'qt_l':     unitWrap(9.46e-4,       { m: 3 }),      // quart (US liquid)
    'gal_l':    unitWrap(3.785e-3,      { m: 3 }),      // gallon (US liquid)

    'pt_d':     unitWrap(5.51e-4,       { m: 3 }),      // pint (US dry)
    'qt_d':     unitWrap(1.101e-3,      { m: 3 }),      // quart (US dry)
    'gal_d':    unitWrap(4.405e-3,      { m: 3 }),      // gallon (US dry)

    // ========================================================================
    // Mass
    // ========================================================================

    // SI ---------------------------------------------------------------------
    'ng':       unitWrap(1e-12,         { kg: 1 }),     // nanogram
    'μg':       unitWrap(1e-9,          { kg: 1 }),     // microgram
    'mg':       unitWrap(1e-6,          { kg: 1 }),     // milligram
    'g':        unitWrap(1e-3,          { kg: 1 }),     // gram
    'kg':       unitWrap(1e0,           { kg: 1 }),     // kilogram (base unit)
    'Mg':       unitWrap(1e3,           { kg: 1 }),     // megagram
    'Gg':       unitWrap(1e6,           { kg: 1 }),     // gigagram

    't':        unitWrap(1e3,           { kg: 1 }),     // tonne (metric ton)
    'u':        unitWrap(1.660539e-27,  { kg: 1 }),     // unified atomic mass unit
    'Da':       unitWrap(1.660539e-27,  { kg: 1 }),     // dalton

    // Imperial ---------------------------------------------------------------
    'oz':       unitWrap(2.83495e-3,    { kg: 1 }),     // ounce
    'lb':       unitWrap(0.453592,      { kg: 1 }),     // pound
    'st':       unitWrap(6.350293,      { kg: 1 }),     // stone
    'ton':      unitWrap(1.0160e3,      { kg: 1 }),     // ton

    // ========================================================================
    // Time
    // ========================================================================

    // SI ---------------------------------------------------------------------
    'as':       unitWrap(1e-18,         { s: 1 }),      // attosecond
    'fs':       unitWrap(1e-15,         { s: 1 }),      // femtosecond
    'ps':       unitWrap(1e-12,         { s: 1 }),      // picosecond
    'ns':       unitWrap(1e-9,          { s: 1 }),      // nanosecond
    'μs':       unitWrap(1e-6,          { s: 1 }),      // microsecond
    'ms':       unitWrap(1e-3,          { s: 1 }),      // millisecond
    's':        unitWrap(1e0,           { s: 1 }),      // second (base unit)

    // Others -----------------------------------------------------------------
    'min':      unitWrap(60,            { s: 1 }),      // minute
    'h':        unitWrap(3600,          { s: 1 }),      // hour
    'hr':       unitWrap(3600,          { s: 1 }),      // hour
    'day':      unitWrap(86400,         { s: 1 }),      // day
    'y':        unitWrap(3.15576e7,     { s: 1 }),      // year (Julian, 365.25 days)
    'yr':       unitWrap(3.15576e7,     { s: 1 }),      // year (Julian, 365.25 days)

    // ========================================================================
    // Angle
    // ========================================================================

    'rad':      valueWrap(1),                           // radian
    'sr':       valueWrap(1),                           // steradian
    'deg':      valueWrap(0.01745329252),               // degree
    '°':        valueWrap(0.01745329252),               // degree

    // ========================================================================
    // Ratio
    // ========================================================================

    '%':      valueWrap(0.01),                          // percent
    '‰':      valueWrap(0.001),                         // permille

    // ========================================================================
    // Temperature
    // ========================================================================

    'K':        unitWrap(1,             { K: 1 }),      // Kelvin (base unit)
    '°C':       unitWrap(1,             { K: 1 }),      // degree Celcius
    '°F':       unitWrap(0.555556,      { K: 1 }),      // degree Fahrenheit
    '°R':       unitWrap(0.555556,      { K: 1 }),      // degree Rankine

    // ========================================================================
    // Speed
    // ========================================================================

    'kph':      unitWrap(0.27778,       { m: 1, s: -1 }),           // kilometers per hour
    'mph':      unitWrap(0.44704,       { m: 1, s: -1 }),           // miles per hour

    // ========================================================================
    // Force
    // ========================================================================

    // SI ---------------------------------------------------------------------
    'nN':       unitWrap(1e-9,          { kg: 1, m: 1, s: -2 }),    // nanonewton
    'μN':       unitWrap(1e-6,          { kg: 1, m: 1, s: -2 }),    // micronewton
    'mN':       unitWrap(1e-3,          { kg: 1, m: 1, s: -2 }),    // millinewton
    'N':        unitWrap(1e0,           { kg: 1, m: 1, s: -2 }),    // newton
    'kN':       unitWrap(1e3,           { kg: 1, m: 1, s: -2 }),    // kilonewton
    'MN':       unitWrap(1e6,           { kg: 1, m: 1, s: -2 }),    // meganewton
    'GN':       unitWrap(1e9,           { kg: 1, m: 1, s: -2 }),    // giganewton

    // Imperial ---------------------------------------------------------------
    'ozf':      unitWrap(0.278014,      { kg: 1, m: 1, s: -2 }),    // ounce force
    'lbf':      unitWrap(4.448222,      { kg: 1, m: 1, s: -2 }),    // pound force

    // Others -----------------------------------------------------------------
    'kgf':      unitWrap(9.80665,       { kg: 1, m: 1, s: -2 }),    // kilogram force

    // ========================================================================
    // Current
    // ========================================================================

    'nA':       unitWrap(1e-9,          { A: 1 }),                  // nanoampere
    'μA':       unitWrap(1e-6,          { A: 1 }),                  // microampere
    'mA':       unitWrap(1e-3,          { A: 1 }),                  // milliampere
    'A':        unitWrap(1e0,           { A: 1 }),                  // ampere (base unit)
    'kA':       unitWrap(1e3,           { A: 1 }),                  // kiloampere
    'MA':       unitWrap(1e6,           { A: 1 }),                  // megaampere
    'GA':       unitWrap(1e9,           { A: 1 }),                  // gigaampere

    // ========================================================================
    // Energy
    // ========================================================================

    // SI ---------------------------------------------------------------------
    'nJ':       unitWrap(1e-9,          { kg: 1, m: 2, s: -2 }),    // nanojoule
    'μJ':       unitWrap(1e-6,          { kg: 1, m: 2, s: -2 }),    // microjoule
    'mJ':       unitWrap(1e-3,          { kg: 1, m: 2, s: -2 }),    // millijoule
    'J':        unitWrap(1e0,           { kg: 1, m: 2, s: -2 }),    // joule
    'kJ':       unitWrap(1e3,           { kg: 1, m: 2, s: -2 }),    // kilojoule
    'MJ':       unitWrap(1e6,           { kg: 1, m: 2, s: -2 }),    // megajoule
    'GJ':       unitWrap(1e9,           { kg: 1, m: 2, s: -2 }),    // gigajoule
    'TJ':       unitWrap(1e12,          { kg: 1, m: 2, s: -2 }),    // terajoule
    'PJ':       unitWrap(1e15,          { kg: 1, m: 2, s: -2 }),    // petajoule

    // Others -----------------------------------------------------------------
    'cal':      unitWrap(4.1868,        { kg: 1, m: 2, s: -2 }),    // calorie
    'kcal':     unitWrap(4186.8,        { kg: 1, m: 2, s: -2 }),    // kilocalorie
    'Cal':      unitWrap(4186.8,        { kg: 1, m: 2, s: -2 }),    // kilocalorie

    // ========================================================================
    // Power
    // ========================================================================

    // SI ---------------------------------------------------------------------
    'nW':       unitWrap(1e-9,          { kg: 1, m: 2, s: -3 }),    // nanowatt
    'μW':       unitWrap(1e-6,          { kg: 1, m: 2, s: -3 }),    // microwatt
    'mW':       unitWrap(1e-3,          { kg: 1, m: 2, s: -3 }),    // milliwatt
    'W':        unitWrap(1e0,           { kg: 1, m: 2, s: -3 }),    // watt
    'kW':       unitWrap(1e3,           { kg: 1, m: 2, s: -3 }),    // kilowatt
    'MW':       unitWrap(1e6,           { kg: 1, m: 2, s: -3 }),    // megawatt
    'GW':       unitWrap(1e9,           { kg: 1, m: 2, s: -3 }),    // gigawatt
    'TW':       unitWrap(1e12,          { kg: 1, m: 2, s: -3 }),    // terawatt
    'PW':       unitWrap(1e15,          { kg: 1, m: 2, s: -3 }),    // petawatt

    // ========================================================================
    // Pressure
    // ========================================================================

    // SI ---------------------------------------------------------------------
    'nPa':      unitWrap(1e-9,          { kg: 1, m: -1, s: -2 }),   // nanopascal
    'μPa':      unitWrap(1e-6,          { kg: 1, m: -1, s: -2 }),   // micropascal
    'mPa':      unitWrap(1e-3,          { kg: 1, m: -1, s: -2 }),   // millipascal
    'Pa':       unitWrap(1e0,           { kg: 1, m: -1, s: -2 }),   // pascal
    'kPa':      unitWrap(1e3,           { kg: 1, m: -1, s: -2 }),   // kilopascal
    'MPa':      unitWrap(1e6,           { kg: 1, m: -1, s: -2 }),   // megapascal
    'GPa':      unitWrap(1e9,           { kg: 1, m: -1, s: -2 }),   // gigapascal
    'TPa':      unitWrap(1e12,          { kg: 1, m: -1, s: -2 }),   // terapascal
    'PPa':      unitWrap(1e15,          { kg: 1, m: -1, s: -2 }),   // petapascal

    // Imperial ---------------------------------------------------------------
    'psi':      unitWrap(6.89475729e3,  { kg: 1, m: -1, s: -2 }),   // pounds per square inch

    // Others ---------------------------------------------------------------
    'atm':      unitWrap(1.01325e5,     { kg: 1, m: -1, s: -2 }),   // standard atmosphere
    'bar':      unitWrap(1e5,           { kg: 1, m: -1, s: -2 }),   // bar
}

function unitWrap(value: number, units: UnitLookup): ResultTreeUnit {
    return {
        type: 'unit',
        units,
        value: valueWrap(value),
    }
}

export default defaultVariables
