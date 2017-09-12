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
    'pc':       unitWrap(3.0856776e16,  { m: 1 }),      // parsec

    'ls':       unitWrap(2.99792458e8,  { m: 1 }),      // light-second
    'ly':       unitWrap(9.46073047e15, { m: 1 }),      // light-year
    'Kly':      unitWrap(9.46073047e18, { m: 1 }),      // kilolight-year
    'Mly':      unitWrap(9.46073047e21, { m: 1 }),      // megalight-year
    'Gly':      unitWrap(9.46073047e24, { m: 1 }),      // gigalight-year

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
    'd':        unitWrap(86400,         { s: 1 }),      // day
    'day':      unitWrap(86400,         { s: 1 }),      // day
    'y':        unitWrap(31557600,      { s: 1 }),      // year (Julian, 365.25 days)
    'yr':       unitWrap(31557600,      { s: 1 }),      // year (Julian, 365.25 days)

    // ========================================================================
    // Frequency
    // ========================================================================

    'nHz':       unitWrap(1e-9,         { s: -1 }),     // nanohertz
    'μHz':       unitWrap(1e-6,         { s: -1 }),     // microhertz
    'mHz':       unitWrap(1e-3,         { s: -1 }),     // millihertz
    'Hz':        unitWrap(1e0,          { s: -1 }),     // hertz
    'kHz':       unitWrap(1e3,          { s: -1 }),     // kilohertz
    'MHz':       unitWrap(1e6,          { s: -1 }),     // megahertz
    'GHz':       unitWrap(1e9,          { s: -1 }),     // gigahertz
    'THz':       unitWrap(1e12,         { s: -1 }),     // terahertz
    'PHz':       unitWrap(1e15,         { s: -1 }),     // petahertz

    // ========================================================================
    // Angle
    // ========================================================================

    'rad':      valueWrap(1),                           // radian
    'sr':       valueWrap(1),                           // steradian
    'deg':      valueWrap(0.01745329252),               // degree
    '°':        valueWrap(0.01745329252),               // degree (symbol)

    // ========================================================================
    // Ratio
    // ========================================================================

    '%':        valueWrap(0.01),                        // percent
    '‰':        valueWrap(0.001),                       // permille

    // ========================================================================
    // Temperature
    // ========================================================================

    'K':        unitWrap(1,             { K: 1 }),      // Kelvin (base unit)
    '°C':       unitWrap(1,             { K: 1 }),      // degree Celcius
    '°F':       unitWrap(0.555556,      { K: 1 }),      // degree Fahrenheit
    '°R':       unitWrap(0.555556,      { K: 1 }),      // degree Rankine

    // Offsets ----------------------------------------------------------------
    '°C_0':     unitWrap(273.15,        { K: 1 }),      // degree Celcius offset from absolute zero
    '°F_0':     unitWrap(255.372,       { K: 1 }),      // degree Fahrenheit offset from absolute zero

    // ========================================================================
    // Speed
    // ========================================================================

    'kph':      unitWrap(0.27778,       { m: 1, s: -1 }),           // kilometers per hour
    'mph':      unitWrap(0.44704,       { m: 1, s: -1 }),           // miles per hour
    'kn':       unitWrap(0.514444,      { m: 1, s: -1 }),           // knot, nautical mile per hour
    'c':        unitWrap(299792458,     { m: 1, s: -1 }),           // Speed of light in vacuum

    // ========================================================================
    // Acceperation
    // ========================================================================

    'g_0':      unitWrap(9.80665,       { m: 1, s: -2 }),           // gravity of Earth

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

    // Others -----------------------------------------------------------------
    'atm':      unitWrap(1.01325e5,     { kg: 1, m: -1, s: -2 }),   // standard atmosphere
    'bar':      unitWrap(1e5,           { kg: 1, m: -1, s: -2 }),   // bar

    // ========================================================================
    // Amount of substance
    // ========================================================================

    'nmol':      unitWrap(1e-9,         { mol: 1 }),                // nanomole
    'μmol':      unitWrap(1e-6,         { mol: 1 }),                // micromole
    'mmol':      unitWrap(1e-3,         { mol: 1 }),                // millimole
    'mol':       unitWrap(1e0,          { mol: 1 }),                // mole (base unit)
    'kmol':      unitWrap(1e3,          { mol: 1 }),                // kilomole
    'Mmol':      unitWrap(1e6,          { mol: 1 }),                // megamole
    'Gmol':      unitWrap(1e9,          { mol: 1 }),                // gigamole
    'Tmol':      unitWrap(1e12,         { mol: 1 }),                // teramole
    'Pmol':      unitWrap(1e15,         { mol: 1 }),                // petamole

    // Related ----------------------------------------------------------------
    'N_A':      unitWrap(6.022140857e23, { mol: -1 }),              // Avogadro constant

    // ========================================================================
    // Luminous intensity
    // ========================================================================

    'ncd':      unitWrap(1e-9,          { cd: 1 }),                 // nanocandela
    'μcd':      unitWrap(1e-6,          { cd: 1 }),                 // microcandela
    'mcd':      unitWrap(1e-3,          { cd: 1 }),                 // millicandela
    'cd':       unitWrap(1e0,           { cd: 1 }),                 // candela (base unit)
    'kcd':      unitWrap(1e3,           { cd: 1 }),                 // kilocandela
    'Mcd':      unitWrap(1e6,           { cd: 1 }),                 // megacandela
    'Gcd':      unitWrap(1e9,           { cd: 1 }),                 // gigacandela
    'Tcd':      unitWrap(1e12,          { cd: 1 }),                 // teracandela
    'Pcd':      unitWrap(1e15,          { cd: 1 }),                 // petacandela

    // ========================================================================
    // Luminous flux
    // ========================================================================

    'nlm':      unitWrap(1e-9,          { cd: 1 }),                 // nanolumen
    'μlm':      unitWrap(1e-6,          { cd: 1 }),                 // microlumen
    'mlm':      unitWrap(1e-3,          { cd: 1 }),                 // millilumen
    'lm':       unitWrap(1e0,           { cd: 1 }),                 // lumen
    'klm':      unitWrap(1e3,           { cd: 1 }),                 // kilolumen
    'Mlm':      unitWrap(1e6,           { cd: 1 }),                 // megalumen
    'Glm':      unitWrap(1e9,           { cd: 1 }),                 // gigalumen
    'Tlm':      unitWrap(1e12,          { cd: 1 }),                 // teralumen
    'Plm':      unitWrap(1e15,          { cd: 1 }),                 // petalumen

    // ========================================================================
    // Illuminance
    // ========================================================================

    'nlx':      unitWrap(1e-9,          { cd: 1, m: -2 }),          // nanolux
    'μlx':      unitWrap(1e-6,          { cd: 1, m: -2 }),          // microlux
    'mlx':      unitWrap(1e-3,          { cd: 1, m: -2 }),          // millilux
    'lx':       unitWrap(1e0,           { cd: 1, m: -2 }),          // lux
    'klx':      unitWrap(1e3,           { cd: 1, m: -2 }),          // kilolux
    'Mlx':      unitWrap(1e6,           { cd: 1, m: -2 }),          // megalux
    'Glx':      unitWrap(1e9,           { cd: 1, m: -2 }),          // gigalux
    'Tlx':      unitWrap(1e12,          { cd: 1, m: -2 }),          // teralux
    'Plx':      unitWrap(1e15,          { cd: 1, m: -2 }),          // petalux

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
    'TA':       unitWrap(1e12,          { A: 1 }),                  // teraampere
    'PA':       unitWrap(1e15,          { A: 1 }),                  // petaampere

    // ========================================================================
    // Charge
    // ========================================================================

    'nC':       unitWrap(1e-9,          { A: 1, s: 1 }),            // nanocoulomb
    'μC':       unitWrap(1e-6,          { A: 1, s: 1 }),            // microcoulomb
    'mC':       unitWrap(1e-3,          { A: 1, s: 1 }),            // millicoulomb
    'C':        unitWrap(1e0,           { A: 1, s: 1 }),            // coulomb
    'kC':       unitWrap(1e3,           { A: 1, s: 1 }),            // kilocoulomb
    'MC':       unitWrap(1e6,           { A: 1, s: 1 }),            // megacoulomb
    'GC':       unitWrap(1e9,           { A: 1, s: 1 }),            // gigacoulomb
    'TC':       unitWrap(1e12,          { A: 1, s: 1 }),            // teracoulomb
    'PC':       unitWrap(1e15,          { A: 1, s: 1 }),            // petacoulomb

    // ========================================================================
    // Voltage
    // ========================================================================

    'nV':       unitWrap(1e-9,          { kg: 1, m: 2, s: -3, A: -1 }),     // nanovolt
    'μV':       unitWrap(1e-6,          { kg: 1, m: 2, s: -3, A: -1 }),     // microvolt
    'mV':       unitWrap(1e-3,          { kg: 1, m: 2, s: -3, A: -1 }),     // millivolt
    'V':        unitWrap(1e0,           { kg: 1, m: 2, s: -3, A: -1 }),     // volt
    'kV':       unitWrap(1e3,           { kg: 1, m: 2, s: -3, A: -1 }),     // kilovolt
    'MV':       unitWrap(1e6,           { kg: 1, m: 2, s: -3, A: -1 }),     // megavolt
    'GV':       unitWrap(1e9,           { kg: 1, m: 2, s: -3, A: -1 }),     // gigavolt
    'TV':       unitWrap(1e12,          { kg: 1, m: 2, s: -3, A: -1 }),     // teravolt
    'PV':       unitWrap(1e15,          { kg: 1, m: 2, s: -3, A: -1 }),     // petavolt

    // ========================================================================
    // Capacitance
    // ========================================================================

    'nF':       unitWrap(1e-9,          { kg: -1, m: -2, s: 4, A: 2 }),     // nanofarad
    'μF':       unitWrap(1e-6,          { kg: -1, m: -2, s: 4, A: 2 }),     // microfarad
    'mF':       unitWrap(1e-3,          { kg: -1, m: -2, s: 4, A: 2 }),     // millifarad
    'F':        unitWrap(1e0,           { kg: -1, m: -2, s: 4, A: 2 }),     // farad
    'kF':       unitWrap(1e3,           { kg: -1, m: -2, s: 4, A: 2 }),     // kilofarad
    'MF':       unitWrap(1e6,           { kg: -1, m: -2, s: 4, A: 2 }),     // megafarad
    'GF':       unitWrap(1e9,           { kg: -1, m: -2, s: 4, A: 2 }),     // gigafarad
    'TF':       unitWrap(1e12,          { kg: -1, m: -2, s: 4, A: 2 }),     // terafarad
    'PF':       unitWrap(1e15,          { kg: -1, m: -2, s: 4, A: 2 }),     // petafarad

    // ========================================================================
    // Resistance
    // ========================================================================

    'nΩ':       unitWrap(1e-9,          { kg: 1, m: 2, s: -3, A: -2 }),     // nanoohm
    'μΩ':       unitWrap(1e-6,          { kg: 1, m: 2, s: -3, A: -2 }),     // microohm
    'mΩ':       unitWrap(1e-3,          { kg: 1, m: 2, s: -3, A: -2 }),     // milliohm
    'Ω':        unitWrap(1e0,           { kg: 1, m: 2, s: -3, A: -2 }),     // ohm
    'kΩ':       unitWrap(1e3,           { kg: 1, m: 2, s: -3, A: -2 }),     // kiloohm
    'MΩ':       unitWrap(1e6,           { kg: 1, m: 2, s: -3, A: -2 }),     // megaohm
    'GΩ':       unitWrap(1e9,           { kg: 1, m: 2, s: -3, A: -2 }),     // gigaohm
    'TΩ':       unitWrap(1e12,          { kg: 1, m: 2, s: -3, A: -2 }),     // teraohm
    'PΩ':       unitWrap(1e15,          { kg: 1, m: 2, s: -3, A: -2 }),     // petaohm

    // ========================================================================
    // Resistance
    // ========================================================================

    'nS':       unitWrap(1e-9,          { kg: -1, m: -2, s: 3, A: 2 }),     // nanosiemens
    'μS':       unitWrap(1e-6,          { kg: -1, m: -2, s: 3, A: 2 }),     // microsiemens
    'mS':       unitWrap(1e-3,          { kg: -1, m: -2, s: 3, A: 2 }),     // millisiemens
    'S':        unitWrap(1e0,           { kg: -1, m: -2, s: 3, A: 2 }),     // siemens
    'kS':       unitWrap(1e3,           { kg: -1, m: -2, s: 3, A: 2 }),     // kilosiemens
    'MS':       unitWrap(1e6,           { kg: -1, m: -2, s: 3, A: 2 }),     // megasiemens
    'GS':       unitWrap(1e9,           { kg: -1, m: -2, s: 3, A: 2 }),     // gigasiemens
    'TS':       unitWrap(1e12,          { kg: -1, m: -2, s: 3, A: 2 }),     // terasiemens
    'PS':       unitWrap(1e15,          { kg: -1, m: -2, s: 3, A: 2 }),     // petasiemens

    // ========================================================================
    // Magnetic flux
    // ========================================================================

    'nWb':      unitWrap(1e-9,          { kg: 1, m: 2, s: -2, A: -1 }),    // nanoweber
    'μWb':      unitWrap(1e-6,          { kg: 1, m: 2, s: -2, A: -1 }),    // microweber
    'mWb':      unitWrap(1e-3,          { kg: 1, m: 2, s: -2, A: -1 }),    // milliweber
    'Wb':       unitWrap(1e0,           { kg: 1, m: 2, s: -2, A: -1 }),    // weber
    'kWb':      unitWrap(1e3,           { kg: 1, m: 2, s: -2, A: -1 }),    // kiloweber
    'MWb':      unitWrap(1e6,           { kg: 1, m: 2, s: -2, A: -1 }),    // megaweber
    'GWb':      unitWrap(1e9,           { kg: 1, m: 2, s: -2, A: -1 }),    // gigaweber
    'TWb':      unitWrap(1e12,          { kg: 1, m: 2, s: -2, A: -1 }),    // teraweber
    'PWb':      unitWrap(1e15,          { kg: 1, m: 2, s: -2, A: -1 }),    // petaweber

    // ========================================================================
    // Magnetic flux density
    // ========================================================================

    'nT':       unitWrap(1e-9,          { kg: 1, s: -2, A: -1 }),           // nanotesla
    'μT':       unitWrap(1e-6,          { kg: 1, s: -2, A: -1 }),           // microtesla
    'mT':       unitWrap(1e-3,          { kg: 1, s: -2, A: -1 }),           // millitesla
    'T':        unitWrap(1e0,           { kg: 1, s: -2, A: -1 }),           // tesla
    'kT':       unitWrap(1e3,           { kg: 1, s: -2, A: -1 }),           // kilotesla
    'MT':       unitWrap(1e6,           { kg: 1, s: -2, A: -1 }),           // megatesla
    'GT':       unitWrap(1e9,           { kg: 1, s: -2, A: -1 }),           // gigatesla
    'TT':       unitWrap(1e12,          { kg: 1, s: -2, A: -1 }),           // teratesla
    'PT':       unitWrap(1e15,          { kg: 1, s: -2, A: -1 }),           // petatesla

    // ========================================================================
    // Magnetic flux
    // ========================================================================

    'nH':       unitWrap(1e-9,          { kg: 1, m: 2, s: -2, A: -2 }),     // nanohenry
    'μH':       unitWrap(1e-6,          { kg: 1, m: 2, s: -2, A: -2 }),     // microhenry
    'mH':       unitWrap(1e-3,          { kg: 1, m: 2, s: -2, A: -2 }),     // millihenry
    'H':        unitWrap(1e0,           { kg: 1, m: 2, s: -2, A: -2 }),     // henry
    'kH':       unitWrap(1e3,           { kg: 1, m: 2, s: -2, A: -2 }),     // kilohenry
    'MH':       unitWrap(1e6,           { kg: 1, m: 2, s: -2, A: -2 }),     // megahenry
    'GH':       unitWrap(1e9,           { kg: 1, m: 2, s: -2, A: -2 }),     // gigahenry
    'TH':       unitWrap(1e12,          { kg: 1, m: 2, s: -2, A: -2 }),     // terahenry
    'PH':       unitWrap(1e15,          { kg: 1, m: 2, s: -2, A: -2 }),     // petahenry

    // ========================================================================
    // Radioactivity (decays per unit of time)
    // ========================================================================

    'nBq':      unitWrap(1e-9,          { s: -1 }),                 // nanobecquerel
    'μBq':      unitWrap(1e-6,          { s: -1 }),                 // microbecquerel
    'mBq':      unitWrap(1e-3,          { s: -1 }),                 // millibecquerel
    'Bq':       unitWrap(1e0,           { s: -1 }),                 // becquerel
    'kBq':      unitWrap(1e3,           { s: -1 }),                 // kilobecquerel
    'MBq':      unitWrap(1e6,           { s: -1 }),                 // megabecquerel
    'GBq':      unitWrap(1e9,           { s: -1 }),                 // gigabecquerel
    'TBq':      unitWrap(1e12,          { s: -1 }),                 // terabecquerel
    'PBq':      unitWrap(1e15,          { s: -1 }),                 // petabecquerel

    // ========================================================================
    // Absorbed dose
    // ========================================================================

    'nGy':      unitWrap(1e-9,          { m: 2, s: -2 }),           // nanogray
    'μGy':      unitWrap(1e-6,          { m: 2, s: -2 }),           // microgray
    'mGy':      unitWrap(1e-3,          { m: 2, s: -2 }),           // milligray
    'Gy':       unitWrap(1e0,           { m: 2, s: -2 }),           // gray
    'kGy':      unitWrap(1e3,           { m: 2, s: -2 }),           // kilogray
    'MGy':      unitWrap(1e6,           { m: 2, s: -2 }),           // megagray
    'GGy':      unitWrap(1e9,           { m: 2, s: -2 }),           // gigagray
    'TGy':      unitWrap(1e12,          { m: 2, s: -2 }),           // teragray
    'PGy':      unitWrap(1e15,          { m: 2, s: -2 }),           // petagray

    // ========================================================================
    // Equivalent dose
    // ========================================================================

    'nSv':      unitWrap(1e-9,          { m: 2, s: -2 }),           // nanosievert
    'μSv':      unitWrap(1e-6,          { m: 2, s: -2 }),           // microsievert
    'mSv':      unitWrap(1e-3,          { m: 2, s: -2 }),           // millisievert
    'Sv':       unitWrap(1e0,           { m: 2, s: -2 }),           // sievert
    'kSv':      unitWrap(1e3,           { m: 2, s: -2 }),           // kilosievert
    'MSv':      unitWrap(1e6,           { m: 2, s: -2 }),           // megasievert
    'GSv':      unitWrap(1e9,           { m: 2, s: -2 }),           // gigasievert
    'TSv':      unitWrap(1e12,          { m: 2, s: -2 }),           // terasievert
    'PSv':      unitWrap(1e15,          { m: 2, s: -2 }),           // petasievert

    // ========================================================================
    // Data
    // ========================================================================

    'bit':      unitWrap(1,                         { bit: 1 }),    // bit
    'B':        unitWrap(8,                         { bit: 1 }),    // byte

    // Decimal bit (bit per IEC 60027) ----------------------------------------
    'kbit':     unitWrap(1e3,                       { bit: 1 }),    // kilobit
    'Mbit':     unitWrap(1e6,                       { bit: 1 }),    // megabit
    'Gbit':     unitWrap(1e9,                       { bit: 1 }),    // gigabit
    'Tbit':     unitWrap(1e12,                      { bit: 1 }),    // terabit
    'Pbit':     unitWrap(1e15,                      { bit: 1 }),    // petabit
    'Ebit':     unitWrap(1e18,                      { bit: 1 }),    // exabit
    'Zbit':     unitWrap(1e21,                      { bit: 1 }),    // zettabit
    'Ybit':     unitWrap(1e24,                      { bit: 1 }),    // yottabit

    // Binary bit (bit per IEC 60027) -----------------------------------------
    'Kibit':    unitWrap(1024,                      { bit: 1 }),    // kilobit
    'Mibit':    unitWrap(1048576,                   { bit: 1 }),    // megabit
    'Gibit':    unitWrap(107374182,                 { bit: 1 }),    // gigabit
    'Tibit':    unitWrap(1099511627776,             { bit: 1 }),    // terabit
    'Pibit':    unitWrap(1125899906842624,          { bit: 1 }),    // petabit
    'Eibit':    unitWrap(1152921504606847000,       { bit: 1 }),    // exabit
    'Zibit':    unitWrap(1180591620717411303424,    { bit: 1 }),    // zettabit
    'Yibit':    unitWrap(1208925819614629174706176, { bit: 1 }),    // yottabit

    // Decimal bit (b per IEEE 1541 Standard) ---------------------------------
    'kb':       unitWrap(1e3,                       { bit: 1 }),    // kilobit
    'Mb':       unitWrap(1e6,                       { bit: 1 }),    // megabit
    'Gb':       unitWrap(1e9,                       { bit: 1 }),    // gigabit
    'Tb':       unitWrap(1e12,                      { bit: 1 }),    // terabit
    'Pb':       unitWrap(1e15,                      { bit: 1 }),    // petabit
    'Eb':       unitWrap(1e18,                      { bit: 1 }),    // exabit
    'Zb':       unitWrap(1e21,                      { bit: 1 }),    // zettabit
    'Yb':       unitWrap(1e24,                      { bit: 1 }),    // yottabit

    // Binary bit (b per IEEE 1541 Standard) ----------------------------------
    'Kib':      unitWrap(1024,                      { bit: 1 }),    // kilobit
    'Mib':      unitWrap(1048576,                   { bit: 1 }),    // megabit
    'Gib':      unitWrap(107374182,                 { bit: 1 }),    // gigabit
    'Tib':      unitWrap(1099511627776,             { bit: 1 }),    // terabit
    'Pib':      unitWrap(1125899906842624,          { bit: 1 }),    // petabit
    'Eib':      unitWrap(1152921504606847000,       { bit: 1 }),    // exabit
    'Zib':      unitWrap(1180591620717411303424,    { bit: 1 }),    // zettabit
    'Yib':      unitWrap(1208925819614629174706176, { bit: 1 }),    // yottabit

    // Decimal byte -----------------------------------------------------------
    'kB':       unitWrap(8e3,                       { bit: 1 }),    // kilobyte
    'MB':       unitWrap(8e6,                       { bit: 1 }),    // megabyte
    'GB':       unitWrap(8e9,                       { bit: 1 }),    // gigabyte
    'TB':       unitWrap(8e12,                      { bit: 1 }),    // terabyte
    'PB':       unitWrap(8e15,                      { bit: 1 }),    // petabyte
    'EB':       unitWrap(8e18,                      { bit: 1 }),    // exabyte
    'ZB':       unitWrap(8e21,                      { bit: 1 }),    // zettabyte
    'YB':       unitWrap(8e24,                      { bit: 1 }),    // yottabyte

    // Binary byte ------------------------------------------------------------
    'KiB':      unitWrap(8192,                      { bit: 1 }),    // kilobyte
    'MiB':      unitWrap(8388608,                   { bit: 1 }),    // megabyte
    'GiB':      unitWrap(8589934592,                { bit: 1 }),    // gigabyte
    'TiB':      unitWrap(8796093022208,             { bit: 1 }),    // terabyte
    'PiB':      unitWrap(9007199254740992,          { bit: 1 }),    // petabyte
    'EiB':      unitWrap(9223372036854776000,       { bit: 1 }),    // exabyte
    'ZiB':      unitWrap(9444732965739290427392,    { bit: 1 }),    // zettabyte
    'YiB':      unitWrap(9671406556917033397649408, { bit: 1 }),    // yottabyte

    // ========================================================================
    // Miscellaneous
    // ========================================================================

    'G':        unitWrap(6.67408e-11,   { m: 3, kg: -1, s: -2 }),   // Gravitational constant
}

function unitWrap(value: number, units: UnitLookup): ResultTreeUnit {
    return {
        type: 'unit',
        units,
        value: valueWrap(value),
    }
}

export default defaultVariables
