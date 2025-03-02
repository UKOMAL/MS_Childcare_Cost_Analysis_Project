/**
 * new-dashboard.js
 * Handles data processing and visualizations for the U.S. Childcare Cost Analysis Dashboard
 */

console.log("Loading new-dashboard.js...");

// Dashboard data with state information and costs
const DASHBOARD_DATA = {
    states: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"],
    costs: {
        2018: {
        infant: [151.23, 78.62, 196.15, 141.92, 303.58, 242.31, 303.58, 196.15, 175.38, 168.46, 196.15, 151.23, 242.31, 196.15, 175.38, 175.38, 141.92, 141.92, 196.15, 303.58, 303.58, 196.15, 303.58, 114.08, 168.46, 168.46, 175.38, 196.15, 242.31, 242.31, 168.46, 303.58, 196.15, 175.38, 168.46, 141.92, 242.31, 196.15, 242.31, 141.92, 141.92, 141.92, 175.38, 168.46, 242.31, 242.31, 303.58, 141.92, 242.31, 168.46, 303.58],
            toddler: [134.42, 69.88, 174.31, 126.15, 269.85, 215.38, 269.85, 174.31, 155.88, 149.73, 174.31, 134.42, 215.38, 174.31, 155.88, 155.88, 126.15, 126.15, 174.31, 269.85, 269.85, 174.31, 269.85, 101.40, 149.73, 149.73, 155.88, 169.08, 208.92, 208.92, 145.24, 261.75, 169.08, 151.20, 145.24, 122.37, 208.92, 169.08, 208.92, 122.37, 122.37, 122.37, 151.20, 145.24, 208.92, 208.92, 261.75, 122.37, 208.92, 145.24, 261.75],
            preschool: [117.62, 61.15, 152.52, 110.38, 236.12, 188.46, 236.12, 152.52, 136.40, 131.02, 152.52, 117.62, 188.46, 152.52, 136.40, 136.40, 110.38, 110.38, 152.52, 236.12, 236.12, 152.52, 236.12, 88.73, 131.02, 131.02, 136.40, 152.52, 188.46, 188.46, 131.02, 236.12, 152.52, 136.40, 131.02, 110.38, 188.46, 152.52, 188.46, 110.38, 110.38, 110.38, 136.40, 131.02, 188.46, 188.46, 236.12, 107.07, 188.46, 131.02, 236.12]
        },
        2017: {
            infant: [146.85, 76.26, 190.27, 137.66, 294.47, 235.04, 294.47, 190.27, 170.12, 163.41, 190.27, 146.85, 235.04, 190.27, 170.12, 170.12, 137.66, 137.66, 190.27, 294.47, 294.47, 190.27, 294.47, 110.66, 163.41, 163.41, 170.12, 190.27, 235.04, 235.04, 163.41, 294.47, 190.27, 170.12, 163.41, 137.66, 235.04, 190.27, 235.04, 137.66, 137.66, 137.66, 170.12, 163.41, 235.04, 235.04, 294.47, 137.66, 235.04, 163.41, 294.47],
            toddler: [130.39, 67.78, 169.08, 122.37, 261.75, 208.92, 261.75, 169.08, 151.20, 145.24, 169.08, 130.39, 208.92, 169.08, 151.20, 151.20, 122.37, 122.37, 169.08, 261.75, 261.75, 169.08, 261.75, 98.36, 145.24, 145.24, 151.20, 169.08, 208.92, 208.92, 145.24, 261.75, 169.08, 151.20, 145.24, 122.37, 208.92, 169.08, 208.92, 122.37, 122.37, 122.37, 151.20, 145.24, 208.92, 208.92, 261.75, 122.37, 208.92, 145.24, 261.75],
            preschool: [114.09, 59.32, 147.94, 107.07, 229.04, 182.81, 229.04, 147.94, 132.31, 127.09, 147.94, 114.09, 182.81, 147.94, 132.31, 132.31, 107.07, 107.07, 147.94, 229.04, 229.04, 147.94, 229.04, 86.07, 127.09, 127.09, 132.31, 147.94, 182.81, 182.81, 127.09, 229.04, 147.94, 132.31, 127.09, 107.07, 182.81, 147.94, 182.81, 107.07, 107.07, 107.07, 132.31, 127.09, 182.81, 182.81, 229.04, 107.07, 182.81, 127.09, 229.04]
        },
        2016: {
            infant: [142.47, 73.90, 184.39, 133.40, 285.36, 227.77, 285.36, 184.39, 164.86, 158.36, 184.39, 142.47, 227.77, 184.39, 164.86, 164.86, 133.40, 133.40, 184.39, 285.36, 285.36, 184.39, 285.36, 107.24, 158.36, 158.36, 164.86, 184.39, 227.77, 227.77, 158.36, 285.36, 184.39, 164.86, 158.36, 133.40, 227.77, 184.39, 227.77, 133.40, 133.40, 133.40, 164.86, 158.36, 227.77, 227.77, 285.36, 133.40, 227.77, 158.36, 285.36],
            toddler: [126.36, 65.68, 163.85, 118.58, 253.65, 202.46, 253.65, 163.85, 146.54, 140.77, 163.85, 126.36, 202.46, 163.85, 146.54, 146.54, 118.58, 118.58, 163.85, 253.65, 253.65, 163.85, 253.65, 95.32, 140.77, 140.77, 146.54, 163.85, 202.46, 202.46, 140.77, 253.65, 163.85, 146.54, 140.77, 118.58, 202.46, 163.85, 202.46, 118.58, 118.58, 118.58, 146.54, 140.77, 202.46, 202.46, 253.65, 118.58, 202.46, 140.77, 253.65],
            preschool: [110.56, 57.54, 143.37, 103.76, 222.00, 177.15, 222.00, 143.37, 128.22, 123.17, 143.37, 110.56, 177.15, 143.37, 128.22, 128.22, 103.76, 103.76, 143.37, 222.00, 222.00, 143.37, 222.00, 83.41, 123.17, 123.17, 128.22, 143.37, 177.15, 177.15, 123.17, 222.00, 143.37, 128.22, 123.17, 103.76, 177.15, 143.37, 177.15, 103.76, 103.76, 103.76, 128.22, 123.17, 177.15, 177.15, 222.00, 103.76, 177.15, 123.17, 222.00]
        },
        2015: {
            infant: [138.09, 71.54, 178.51, 129.20, 276.25, 220.53, 276.25, 178.51, 159.61, 153.35, 178.51, 138.09, 220.53, 178.51, 159.61, 159.61, 129.20, 129.20, 178.51, 276.25, 276.25, 178.51, 276.25, 103.88, 153.35, 153.35, 159.61, 178.51, 220.53, 220.53, 153.35, 276.25, 178.51, 159.61, 153.35, 129.20, 220.53, 178.51, 220.53, 129.20, 129.20, 129.20, 159.61, 153.35, 220.53, 220.53, 276.25, 129.20, 220.53, 153.35, 276.25],
            toddler: [122.57, 63.57, 158.67, 114.82, 245.56, 196.02, 245.56, 158.67, 141.88, 136.31, 158.67, 122.57, 196.02, 158.67, 141.88, 141.88, 114.82, 114.82, 158.67, 245.56, 245.56, 158.67, 245.56, 92.34, 136.31, 136.31, 141.88, 158.67, 196.02, 196.02, 136.31, 245.56, 158.67, 141.88, 136.31, 114.82, 196.02, 158.67, 196.02, 114.82, 114.82, 114.82, 141.88, 136.31, 196.02, 196.02, 245.56, 114.82, 196.02, 136.31, 245.56],
            preschool: [107.24, 55.81, 138.83, 97.22, 207.78, 165.89, 207.78, 134.27, 120.06, 115.36, 134.27, 107.24, 165.89, 134.27, 120.06, 120.06, 97.22, 97.22, 134.27, 207.78, 207.78, 134.27, 207.78, 78.18, 115.36, 115.36, 120.06, 134.27, 165.89, 165.89, 107.51, 193.65, 125.15, 111.90, 107.51, 90.72, 154.64, 125.15, 154.64, 90.72, 90.72, 90.72, 111.90, 107.51, 154.64, 154.64, 193.65, 90.72, 154.64, 107.51, 193.65]
        },
        2014: {
            infant: [133.71, 69.18, 172.63, 125.00, 267.14, 213.29, 267.14, 172.63, 154.36, 148.32, 172.63, 133.71, 213.29, 172.63, 154.36, 154.36, 125.00, 125.00, 172.63, 267.14, 267.14, 172.63, 267.14, 100.52, 148.32, 148.32, 154.36, 172.63, 213.29, 213.29, 148.32, 267.14, 172.63, 154.36, 148.32, 125.00, 213.29, 172.63, 213.29, 125.00, 125.00, 125.00, 154.36, 148.32, 213.29, 213.29, 267.14, 125.00, 213.29, 148.32, 267.14],
            toddler: [118.78, 61.49, 153.45, 103.64, 237.46, 183.16, 237.46, 153.45, 137.21, 131.84, 153.45, 118.78, 183.16, 153.45, 137.21, 137.21, 111.11, 111.11, 153.45, 237.46, 237.46, 153.45, 237.46, 89.35, 131.84, 131.84, 137.21, 153.45, 183.16, 183.16, 131.84, 237.46, 153.45, 137.21, 131.84, 111.11, 183.16, 153.45, 183.16, 111.11, 111.11, 111.11, 137.21, 131.84, 183.16, 183.16, 237.46, 111.11, 183.16, 131.84, 237.46],
            preschool: [103.93, 53.93, 134.27, 90.72, 193.65, 154.64, 193.65, 125.15, 111.90, 107.51, 125.15, 103.93, 154.64, 125.15, 111.90, 111.90, 90.72, 90.72, 125.15, 193.65, 193.65, 125.15, 193.65, 72.74, 107.51, 107.51, 111.90, 125.15, 154.64, 154.64, 107.51, 193.65, 125.15, 111.90, 107.51, 90.72, 154.64, 125.15, 154.64, 90.72, 90.72, 90.72, 111.90, 107.51, 154.64, 154.64, 193.65, 90.72, 154.64, 107.51, 193.65]
        },
        2012: {
            infant: [129.33, 66.82, 166.75, 120.80, 258.03, 206.05, 258.03, 166.75, 149.11, 143.27, 166.75, 129.33, 206.05, 166.75, 149.11, 149.11, 120.80, 120.80, 166.75, 258.03, 258.03, 166.75, 258.03, 97.16, 143.27, 143.27, 149.11, 166.75, 206.05, 206.05, 143.27, 258.03, 166.75, 149.11, 143.27, 120.80, 206.05, 166.75, 206.05, 120.80, 120.80, 120.80, 149.11, 143.27, 206.05, 206.05, 258.03, 120.80, 206.05, 143.27, 258.03],
            toddler: [114.99, 59.41, 148.23, 107.40, 229.39, 183.16, 229.39, 148.23, 132.54, 127.35, 148.23, 114.99, 183.16, 148.23, 132.54, 132.54, 107.40, 107.40, 148.23, 229.39, 229.39, 148.23, 229.39, 86.36, 127.35, 127.35, 132.54, 148.23, 183.16, 183.16, 127.35, 229.39, 148.23, 132.54, 127.35, 107.40, 183.16, 148.23, 183.16, 107.40, 107.40, 107.40, 132.54, 127.35, 183.16, 183.16, 229.39, 107.40, 183.16, 127.35, 229.39],
            preschool: [100.62, 52.05, 129.71, 93.97, 193.65, 154.64, 193.65, 125.15, 111.90, 107.51, 125.15, 100.62, 154.64, 125.15, 111.90, 111.90, 90.72, 90.72, 125.15, 193.65, 193.65, 125.15, 193.65, 72.74, 107.51, 107.51, 111.90, 125.15, 154.64, 154.64, 107.51, 193.65, 125.15, 111.90, 107.51, 90.72, 154.64, 125.15, 154.64, 90.72, 90.72, 90.72, 111.90, 107.51, 154.64, 154.64, 193.65, 90.72, 154.64, 107.51, 193.65]
        },
        2010: {
            infant: [124.95, 64.46, 160.87, 116.60, 248.92, 198.81, 248.92, 160.87, 143.86, 138.22, 160.87, 124.95, 198.81, 160.87, 143.86, 143.86, 116.60, 116.60, 160.87, 248.92, 248.92, 160.87, 248.92, 93.80, 138.22, 138.22, 143.86, 160.87, 198.81, 198.81, 138.22, 248.92, 160.87, 143.86, 138.22, 116.60, 198.81, 160.87, 198.81, 116.60, 116.60, 116.60, 143.86, 138.22, 198.81, 198.81, 248.92, 116.60, 198.81, 138.22, 248.92],
            toddler: [111.19, 57.33, 143.01, 103.64, 221.32, 176.73, 221.32, 143.01, 127.87, 122.87, 143.01, 111.19, 176.73, 143.01, 127.87, 127.87, 103.64, 103.64, 143.01, 221.32, 221.32, 143.01, 221.32, 83.37, 122.87, 122.87, 127.87, 143.01, 176.73, 176.73, 122.87, 221.32, 143.01, 127.87, 122.87, 103.64, 176.73, 143.01, 176.73, 103.64, 103.64, 103.64, 127.87, 122.87, 176.73, 176.73, 221.32, 103.64, 176.73, 122.87, 221.32],
            preschool: [97.31, 50.17, 125.15, 90.72, 193.65, 154.64, 193.65, 125.15, 111.90, 107.51, 125.15, 97.31, 154.64, 125.15, 111.90, 111.90, 90.72, 90.72, 125.15, 193.65, 193.65, 125.15, 193.65, 72.74, 107.51, 107.51, 111.90, 125.15, 154.64, 154.64, 107.51, 193.65, 125.15, 111.90, 107.51, 90.72, 154.64, 125.15, 154.64, 90.72, 90.72, 90.72, 111.90, 107.51, 154.64, 154.64, 193.65, 90.72, 154.64, 107.51, 193.65]
        },
        2008: {
            infant: [120.57, 62.10, 154.99, 112.40, 239.81, 191.57, 239.81, 154.99, 138.61, 133.17, 154.99, 120.57, 191.57, 154.99, 138.61, 138.61, 112.40, 112.40, 154.99, 239.81, 239.81, 154.99, 239.81, 90.44, 133.17, 133.17, 138.61, 154.99, 191.57, 191.57, 133.17, 239.81, 154.99, 138.61, 133.17, 112.40, 191.57, 154.99, 191.57, 112.40, 112.40, 112.40, 138.61, 133.17, 191.57, 191.57, 239.81, 112.40, 191.57, 133.17, 239.81],
            toddler: [107.39, 55.25, 137.79, 99.91, 213.25, 170.27, 213.25, 137.79, 123.22, 118.39, 137.79, 107.39, 170.27, 137.79, 123.22, 123.22, 99.91, 99.91, 137.79, 213.25, 213.25, 137.79, 213.25, 80.38, 118.39, 118.39, 123.22, 137.79, 170.27, 170.27, 118.39, 213.25, 137.79, 123.22, 118.39, 99.91, 170.27, 137.79, 170.27, 99.91, 99.91, 99.91, 123.22, 118.39, 170.27, 170.27, 213.25, 99.91, 170.27, 118.39, 213.25],
            preschool: [93.99, 48.27, 120.59, 87.42, 186.59, 148.99, 186.59, 120.59, 107.82, 103.59, 120.59, 93.99, 148.99, 120.59, 107.82, 107.82, 87.42, 87.42, 120.59, 186.59, 186.59, 120.59, 186.59, 70.02, 103.59, 103.59, 107.82, 120.59, 148.99, 148.99, 103.59, 186.59, 120.59, 107.82, 103.59, 87.42, 148.99, 120.59, 148.99, 87.42, 87.42, 87.42, 107.82, 103.59, 148.99, 148.99, 186.59, 87.42, 148.99, 103.59, 186.59]
        }
    },
    metrics: {
        2018: {
        annual_cost: [7864.0, 4088.0, 10200.0, 7380.0, 15792.0, 12600.0, 15792.0, 10200.0, 9120.0, 8760.0, 10200.0, 7864.0, 12600.0, 10200.0, 9120.0, 9120.0, 7380.0, 7380.0, 10200.0, 15792.0, 15792.0, 10200.0, 15792.0, 5932.0, 8760.0, 8760.0, 9120.0, 10200.0, 12600.0, 12600.0, 8760.0, 15792.0, 10200.0, 9120.0, 8760.0, 7380.0, 12600.0, 10200.0, 12600.0, 7380.0, 7380.0, 7380.0, 9120.0, 8760.0, 12600.0, 12600.0, 15792.0, 7380.0, 12600.0, 8760.0, 15792.0],
        cost_burden: [0.14, 0.06, 0.17, 0.15, 0.21, 0.16, 0.18, 0.14, 0.16, 0.15, 0.14, 0.15, 0.17, 0.17, 0.15, 0.15, 0.16, 0.15, 0.19, 0.18, 0.19, 0.17, 0.19, 0.14, 0.15, 0.17, 0.15, 0.16, 0.16, 0.16, 0.17, 0.21, 0.17, 0.14, 0.16, 0.15, 0.19, 0.17, 0.19, 0.15, 0.14, 0.15, 0.15, 0.14, 0.19, 0.15, 0.19, 0.16, 0.18, 0.15, 0.21],
        working_parent_ratio: [0.65, 0.71, 0.62, 0.64, 0.64, 0.68, 0.72, 0.71, 0.63, 0.67, 0.65, 0.65, 0.69, 0.68, 0.74, 0.71, 0.65, 0.64, 0.71, 0.71, 0.71, 0.68, 0.76, 0.64, 0.71, 0.69, 0.73, 0.67, 0.73, 0.68, 0.61, 0.65, 0.68, 0.76, 0.69, 0.65, 0.65, 0.68, 0.72, 0.67, 0.74, 0.66, 0.64, 0.65, 0.74, 0.68, 0.65, 0.61, 0.73, 0.71, 0.71]
        },
        2017: {
            annual_cost: [7636.2, 3965.4, 9894.0, 7158.6, 15318.2, 12222.0, 15318.2, 9894.0, 8846.4, 8497.2, 9894.0, 7636.2, 12222.0, 9894.0, 8846.4, 8846.4, 7158.6, 7158.6, 9894.0, 15318.2, 15318.2, 9894.0, 15318.2, 5754.0, 8497.2, 8497.2, 8846.4, 9894.0, 12222.0, 12222.0, 8497.2, 15318.2, 9894.0, 8846.4, 8497.2, 7158.6, 12222.0, 9894.0, 12222.0, 7158.6, 7158.6, 7158.6, 8846.4, 8497.2, 12222.0, 12222.0, 15318.2, 7158.6, 12222.0, 8497.2, 15318.2],
            cost_burden: [0.13, 0.06, 0.16, 0.14, 0.20, 0.15, 0.17, 0.13, 0.15, 0.14, 0.13, 0.14, 0.16, 0.16, 0.14, 0.14, 0.15, 0.14, 0.18, 0.17, 0.18, 0.16, 0.18, 0.13, 0.14, 0.16, 0.14, 0.15, 0.15, 0.15, 0.16, 0.20, 0.16, 0.13, 0.15, 0.14, 0.18, 0.16, 0.18, 0.14, 0.13, 0.14, 0.14, 0.13, 0.18, 0.14, 0.18, 0.15, 0.17, 0.14, 0.20],
            working_parent_ratio: [0.64, 0.70, 0.61, 0.63, 0.63, 0.67, 0.71, 0.70, 0.62, 0.66, 0.64, 0.64, 0.68, 0.67, 0.73, 0.70, 0.64, 0.63, 0.70, 0.70, 0.70, 0.67, 0.75, 0.63, 0.70, 0.68, 0.72, 0.66, 0.72, 0.67, 0.60, 0.64, 0.67, 0.75, 0.68, 0.64, 0.64, 0.67, 0.71, 0.66, 0.73, 0.65, 0.63, 0.64, 0.73, 0.67, 0.64, 0.60, 0.72, 0.70, 0.70]
        },
        2016: {
            annual_cost: [7408.4, 3842.8, 9588.0, 6937.2, 14844.4, 11844.0, 14844.4, 9588.0, 8572.8, 8234.4, 9588.0, 7408.4, 11844.0, 9588.0, 8572.8, 8572.8, 6937.2, 6937.2, 9588.0, 14844.4, 14844.4, 9588.0, 14844.4, 5576.0, 8234.4, 8234.4, 8572.8, 9588.0, 11844.0, 11844.0, 8234.4, 14844.4, 9588.0, 8572.8, 8234.4, 6937.2, 11844.0, 9588.0, 11844.0, 6937.2, 6937.2, 6937.2, 8572.8, 8234.4, 11844.0, 11844.0, 14844.4, 6937.2, 11844.0, 8234.4, 14844.4],
            cost_burden: [0.12, 0.05, 0.15, 0.13, 0.19, 0.14, 0.16, 0.12, 0.14, 0.13, 0.12, 0.13, 0.15, 0.15, 0.13, 0.13, 0.14, 0.13, 0.17, 0.16, 0.17, 0.15, 0.17, 0.12, 0.13, 0.15, 0.13, 0.14, 0.14, 0.14, 0.15, 0.19, 0.15, 0.12, 0.14, 0.13, 0.17, 0.15, 0.17, 0.13, 0.12, 0.13, 0.13, 0.12, 0.17, 0.13, 0.17, 0.14, 0.16, 0.13, 0.19],
            working_parent_ratio: [0.63, 0.69, 0.60, 0.62, 0.62, 0.66, 0.70, 0.69, 0.61, 0.65, 0.63, 0.63, 0.67, 0.66, 0.72, 0.69, 0.63, 0.62, 0.69, 0.69, 0.69, 0.66, 0.74, 0.62, 0.69, 0.67, 0.71, 0.65, 0.71, 0.66, 0.59, 0.63, 0.66, 0.74, 0.67, 0.63, 0.63, 0.66, 0.70, 0.65, 0.72, 0.64, 0.62, 0.63, 0.72, 0.66, 0.63, 0.59, 0.71, 0.69, 0.69]
        },
        2015: {
            annual_cost: [7180.6, 3720.4, 9281.6, 6715.8, 14370.4, 11467.2, 14370.4, 9281.6, 8295.6, 7966.8, 9281.6, 7180.6, 11467.2, 9281.6, 8295.6, 8295.6, 6715.8, 6715.8, 9281.6, 14370.4, 14370.4, 9281.6, 14370.4, 5397.6, 7966.8, 7966.8, 8295.6, 9281.6, 11467.2, 11467.2, 7966.8, 14370.4, 9281.6, 8295.6, 7966.8, 6715.8, 11467.2, 9281.6, 11467.2, 6715.8, 6715.8, 6715.8, 8295.6, 7966.8, 11467.2, 11467.2, 14370.4, 6715.8, 11467.2, 7966.8, 14370.4],
            cost_burden: [0.11, 0.04, 0.14, 0.12, 0.18, 0.13, 0.15, 0.11, 0.13, 0.12, 0.11, 0.12, 0.14, 0.14, 0.12, 0.12, 0.13, 0.12, 0.16, 0.15, 0.16, 0.14, 0.16, 0.11, 0.12, 0.14, 0.12, 0.13, 0.13, 0.13, 0.14, 0.18, 0.14, 0.11, 0.13, 0.12, 0.16, 0.14, 0.16, 0.12, 0.11, 0.12, 0.12, 0.11, 0.16, 0.12, 0.16, 0.13, 0.15, 0.12, 0.18],
            working_parent_ratio: [0.62, 0.68, 0.59, 0.61, 0.61, 0.65, 0.69, 0.68, 0.60, 0.64, 0.62, 0.62, 0.66, 0.65, 0.71, 0.68, 0.62, 0.61, 0.68, 0.68, 0.68, 0.65, 0.73, 0.61, 0.68, 0.66, 0.70, 0.64, 0.70, 0.65, 0.58, 0.62, 0.65, 0.73, 0.66, 0.62, 0.62, 0.65, 0.69, 0.64, 0.71, 0.63, 0.61, 0.62, 0.71, 0.65, 0.62, 0.58, 0.70, 0.68, 0.68]
        },
        2014: {
            annual_cost: [6952.8, 3598.0, 8975.2, 6494.4, 13896.4, 11090.0, 13896.4, 8975.2, 8018.4, 7698.0, 8975.2, 6952.8, 11090.0, 8975.2, 8018.4, 8018.4, 6494.4, 6494.4, 8975.2, 13896.4, 13896.4, 8975.2, 13896.4, 5219.2, 7698.0, 7698.0, 8018.4, 8975.2, 11090.0, 11090.0, 7698.0, 13896.4, 8975.2, 8018.4, 7698.0, 6494.4, 11090.0, 8975.2, 11090.0, 6494.4, 6494.4, 6494.4, 8018.4, 7698.0, 11090.0, 11090.0, 13896.4, 6494.4, 11090.0, 7698.0, 13896.4],
            cost_burden: [0.10, 0.03, 0.13, 0.11, 0.17, 0.12, 0.14, 0.10, 0.12, 0.11, 0.10, 0.11, 0.13, 0.13, 0.11, 0.11, 0.12, 0.11, 0.15, 0.14, 0.15, 0.13, 0.15, 0.10, 0.11, 0.13, 0.11, 0.12, 0.12, 0.12, 0.13, 0.17, 0.13, 0.10, 0.12, 0.11, 0.15, 0.13, 0.15, 0.11, 0.10, 0.11, 0.11, 0.10, 0.15, 0.11, 0.15, 0.12, 0.14, 0.11, 0.17],
            working_parent_ratio: [0.61, 0.67, 0.58, 0.60, 0.60, 0.64, 0.68, 0.67, 0.59, 0.63, 0.61, 0.61, 0.65, 0.64, 0.70, 0.67, 0.61, 0.60, 0.67, 0.67, 0.67, 0.64, 0.72, 0.60, 0.67, 0.65, 0.69, 0.63, 0.69, 0.64, 0.57, 0.61, 0.64, 0.72, 0.65, 0.61, 0.61, 0.64, 0.68, 0.63, 0.70, 0.62, 0.60, 0.61, 0.70, 0.64, 0.61, 0.57, 0.69, 0.67, 0.67]
        },
        2012: {
            annual_cost: [6725.0, 3475.6, 8668.8, 6273.0, 13422.4, 10712.8, 13422.4, 8668.8, 7741.2, 7429.2, 8668.8, 6725.0, 10712.8, 8668.8, 7741.2, 7741.2, 6273.0, 6273.0, 8668.8, 13422.4, 13422.4, 8668.8, 13422.4, 5040.8, 7429.2, 7429.2, 7741.2, 8668.8, 10712.8, 10712.8, 7429.2, 13422.4, 8668.8, 7741.2, 7429.2, 6273.0, 10712.8, 8668.8, 10712.8, 6273.0, 6273.0, 6273.0, 7741.2, 7429.2, 10712.8, 10712.8, 13422.4, 6273.0, 10712.8, 7429.2, 13422.4],
            cost_burden: [0.09, 0.02, 0.12, 0.10, 0.16, 0.11, 0.13, 0.09, 0.11, 0.10, 0.09, 0.10, 0.12, 0.12, 0.10, 0.10, 0.11, 0.10, 0.14, 0.13, 0.14, 0.12, 0.14, 0.09, 0.10, 0.12, 0.10, 0.11, 0.11, 0.11, 0.12, 0.16, 0.12, 0.09, 0.11, 0.10, 0.14, 0.12, 0.14, 0.10, 0.09, 0.10, 0.10, 0.09, 0.14, 0.10, 0.14, 0.11, 0.13, 0.10, 0.16],
            working_parent_ratio: [0.60, 0.66, 0.57, 0.59, 0.59, 0.63, 0.67, 0.66, 0.58, 0.62, 0.60, 0.60, 0.64, 0.63, 0.69, 0.66, 0.60, 0.59, 0.66, 0.66, 0.66, 0.63, 0.71, 0.59, 0.66, 0.64, 0.68, 0.62, 0.68, 0.63, 0.56, 0.60, 0.63, 0.71, 0.64, 0.60, 0.60, 0.63, 0.67, 0.62, 0.69, 0.61, 0.59, 0.60, 0.69, 0.63, 0.60, 0.56, 0.68, 0.66, 0.66]
        },
        2010: {
            annual_cost: [6497.2, 3353.2, 8362.4, 6051.6, 12948.4, 10335.6, 12948.4, 8362.4, 7464.0, 7160.4, 8362.4, 6497.2, 10335.6, 8362.4, 7464.0, 7464.0, 6051.6, 6051.6, 8362.4, 12948.4, 12948.4, 8362.4, 12948.4, 4862.4, 7160.4, 7160.4, 7464.0, 8362.4, 10335.6, 10335.6, 7160.4, 12948.4, 8362.4, 7464.0, 7160.4, 6051.6, 10335.6, 8362.4, 10335.6, 6051.6, 6051.6, 6051.6, 7464.0, 7160.4, 10335.6, 10335.6, 12948.4, 6051.6, 10335.6, 7160.4, 12948.4],
            cost_burden: [0.08, 0.01, 0.11, 0.09, 0.15, 0.10, 0.12, 0.08, 0.10, 0.09, 0.08, 0.09, 0.11, 0.11, 0.09, 0.09, 0.10, 0.09, 0.13, 0.12, 0.13, 0.11, 0.13, 0.08, 0.09, 0.11, 0.09, 0.10, 0.10, 0.10, 0.11, 0.15, 0.11, 0.08, 0.10, 0.09, 0.13, 0.11, 0.13, 0.09, 0.08, 0.09, 0.09, 0.08, 0.13, 0.09, 0.13, 0.10, 0.12, 0.09, 0.15],
            working_parent_ratio: [0.59, 0.65, 0.56, 0.58, 0.58, 0.62, 0.66, 0.65, 0.57, 0.61, 0.59, 0.59, 0.63, 0.62, 0.68, 0.65, 0.59, 0.58, 0.65, 0.65, 0.65, 0.62, 0.70, 0.58, 0.65, 0.63, 0.67, 0.61, 0.67, 0.62, 0.55, 0.59, 0.62, 0.70, 0.63, 0.59, 0.59, 0.62, 0.66, 0.61, 0.68, 0.60, 0.58, 0.59, 0.68, 0.62, 0.59, 0.55, 0.67, 0.65, 0.65]
        },
        2008: {
            infant: [120.57, 62.10, 154.99, 112.40, 239.81, 191.57, 239.81, 154.99, 138.61, 133.17, 154.99, 120.57, 191.57, 154.99, 138.61, 138.61, 112.40, 112.40, 154.99, 239.81, 239.81, 154.99, 239.81, 90.44, 133.17, 133.17, 138.61, 154.99, 191.57, 191.57, 133.17, 239.81, 154.99, 138.61, 133.17, 112.40, 191.57, 154.99, 191.57, 112.40, 112.40, 112.40, 138.61, 133.17, 191.57, 191.57, 239.81, 112.40, 191.57, 133.17, 239.81],
            toddler: [107.39, 55.25, 137.79, 99.91, 213.25, 170.27, 213.25, 137.79, 123.22, 118.39, 137.79, 107.39, 170.27, 137.79, 123.22, 123.22, 99.91, 99.91, 137.79, 213.25, 213.25, 137.79, 213.25, 80.38, 118.39, 118.39, 123.22, 137.79, 170.27, 170.27, 118.39, 213.25, 137.79, 123.22, 118.39, 99.91, 170.27, 137.79, 170.27, 99.91, 99.91, 99.91, 123.22, 118.39, 170.27, 170.27, 213.25, 99.91, 170.27, 118.39, 213.25],
            preschool: [93.99, 48.27, 120.59, 87.42, 186.59, 148.99, 186.59, 120.59, 107.82, 103.59, 120.59, 93.99, 148.99, 120.59, 107.82, 107.82, 87.42, 87.42, 120.59, 186.59, 186.59, 120.59, 186.59, 70.02, 103.59, 103.59, 107.82, 120.59, 148.99, 148.99, 103.59, 186.59, 120.59, 107.82, 103.59, 87.42, 148.99, 120.59, 148.99, 87.42, 87.42, 87.42, 107.82, 103.59, 148.99, 148.99, 186.59, 87.42, 148.99, 103.59, 186.59]
        }
    }
};

// State names for better display
const STATE_NAMES = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
    "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia",
    "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa",
    "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland",
    "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri",
    "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey",
    "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio",
    "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
    "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont",
    "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming",
    "DC": "District of Columbia"
};

// Define which visualizations should show the year filter
const timeBasedVisualizations = ['geoChoropleth', 'timeSeriesAnalysis', 'workingParentsBurden'];

/**
 * Status message functions
 * @param {string} message - The message to display
 * @param {string} type - The type of message (info, success, error, warning)
 */
function showStatus(message, type = 'info') {
    console.log(`Status: ${message} (${type})`);
    const statusElement = document.getElementById('statusMessage');
    if (!statusElement) {
        console.error("Status element not found!");
        return;
    }
    
    statusElement.textContent = message;
    statusElement.className = 'status-message';
    
    switch(type) {
        case 'success':
            statusElement.classList.add('status-success');
            break;
        case 'error':
            statusElement.classList.add('status-error');
            break;
        case 'warning':
            statusElement.classList.add('status-warning');
            break;
        default:
            statusElement.classList.add('status-info');
    }
}

/**
 * Update insights panel with statistics
 * @param {string} dataType - The type of data to display (infant, toddler, preschool)
 */
function updateInsights(dataType) {
    const costs = DASHBOARD_DATA.costs[dataType];
    
    // Calculate statistics
    const avg = costs.reduce((sum, val) => sum + val, 0) / costs.length;
    const min = Math.min(...costs);
    const max = Math.max(...costs);
    
    // Find highest and lowest states
    const highestIdx = costs.indexOf(max);
    const lowestIdx = costs.indexOf(min);
    const highestState = DASHBOARD_DATA.states[highestIdx];
    const lowestState = DASHBOARD_DATA.states[lowestIdx];
    
    // Update DOM
    document.getElementById('avgCost').textContent = `$${avg.toFixed(2)} per month`;
    document.getElementById('costRange').textContent = `$${min.toFixed(2)} - $${max.toFixed(2)} per month`;
    document.getElementById('highestState').textContent = `${STATE_NAMES[highestState]} ($${max.toFixed(2)})`;
    document.getElementById('lowestState').textContent = `${STATE_NAMES[lowestState]} ($${min.toFixed(2)})`;
}

/**
 * Get readable label for data type
 * @param {string} dataType - The type of data (infant, toddler, preschool)
 * @returns {string} - Human-readable label
 */
function getDataTypeLabel(dataType) {
    switch(dataType) {
        case 'infant':
            return 'Infant Care';
        case 'toddler':
            return 'Toddler Care';
        case 'preschool':
            return 'Preschool Care';
        default:
            return 'Childcare';
    }
}

/**
 * Create US map visualization
 */
function createHeatMap(container, year, baseLayout) {
    const data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: DASHBOARD_DATA.states,
        z: DASHBOARD_DATA.costs[year].infant,
        text: DASHBOARD_DATA.states.map((state, i) => 
            `${STATE_NAMES[state]}<br>` +
            `Monthly Cost: $${DASHBOARD_DATA.costs[year].infant[i].toFixed(2)}<br>` +
            `Cost Burden: ${(DASHBOARD_DATA.metrics[year].cost_burden[i] * 100).toFixed(1)}%<br>` +
            `Working Parents: ${(DASHBOARD_DATA.metrics[year].working_parent_ratio[i] * 100).toFixed(1)}%`
        ),
        hoverinfo: 'text',
        colorscale: 'Viridis',
        colorbar: {
            title: 'Monthly Cost ($)',
            thickness: 20
        }
    }];

    const layout = {
        ...baseLayout,
        title: 'Childcare Cost Distribution by State',
        geo: {
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)'
        }
    };

    Plotly.newPlot(container.id, data, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating heat map:', err);
            container.innerHTML = '<div class="error">Error creating cost distribution map</div>';
        });
}

/**
 * Create time series visualization
 */
function createTimeSeries(container, year, baseLayout) {
    const regions = {
        'Northeast': ['CT', 'ME', 'MA', 'NH', 'RI', 'VT', 'NJ', 'NY', 'PA'],
        'Southeast': ['AL', 'AR', 'FL', 'GA', 'KY', 'LA', 'MS', 'NC', 'SC', 'TN', 'VA', 'WV'],
        'Midwest': ['IL', 'IN', 'IA', 'KS', 'MI', 'MN', 'MO', 'NE', 'ND', 'OH', 'SD', 'WI'],
        'Southwest': ['AZ', 'NM', 'OK', 'TX'],
        'West': ['AK', 'CA', 'CO', 'HI', 'ID', 'MT', 'NV', 'OR', 'UT', 'WA', 'WY']
    };

    const regionColors = {
        'Northeast': '#FF9999',
        'Southeast': '#66B2FF',
        'Midwest': '#99FF99',
        'Southwest': '#FFCC99',
        'West': '#FF99CC'
    };

    const years = Array.from({length: 11}, (_, i) => 2008 + i);
    const data = [];

    // Calculate average costs for each region over the years
    Object.entries(regions).forEach(([region, states]) => {
        const costs = years.map(year => {
            const stateCosts = states.map(state => {
                const stateIndex = DASHBOARD_DATA.states.indexOf(state);
                const yearData = DASHBOARD_DATA.costs[year.toString()];
                if (!yearData) return null;
                // Calculate average of infant, toddler, and preschool costs
                const costs = [yearData.infant[stateIndex], yearData.toddler[stateIndex], yearData.preschool[stateIndex]];
                return costs.reduce((a, b) => a + b, 0) / costs.length;
            }).filter(cost => cost !== null);
            
            return stateCosts.length > 0 ? 
                Math.round(stateCosts.reduce((a, b) => a + b, 0) / stateCosts.length * 100) : null;
        });

        const regionData = {
            x: years,
            y: costs,
            name: region,
            type: 'scatter',
            mode: 'lines+markers+text',
            line: {
                color: regionColors[region],
                width: 2,
                shape: 'linear'
            },
            marker: {
                size: 8,
                color: regionColors[region]
            },
            text: costs.map(cost => cost ? `$${cost.toLocaleString()}` : ''),
            textposition: 'top center',
            textfont: {
                size: 10
            },
            hovertemplate: '%{text}<extra></extra>'
        };
        data.push(regionData);
    });

    const layout = {
        ...baseLayout,
        title: {
            text: 'Regional Childcare Cost Trends (2008-2018)',
            font: {
                size: 24
            }
        },
        xaxis: {
            title: 'Year',
            tickmode: 'array',
            ticktext: years,
            tickvals: years,
            showgrid: true,
            gridcolor: '#E5E5E5'
        },
        yaxis: {
            title: 'Annual Cost ($)',
            range: [10000, 30000],
            showgrid: true,
            gridcolor: '#E5E5E5',
            tickformat: '$,.0f'
        },
        showlegend: true,
        legend: {
            title: {
                text: 'Region'
            },
            x: 1.02,
            y: 1,
            xanchor: 'left'
        },
        margin: {
            l: 80,
            r: 150,
            t: 50,
            b: 60
        },
        plot_bgcolor: 'white',
        paper_bgcolor: 'white'
    };

    Plotly.newPlot(container, data, layout, {responsive: true});
}

/**
 * Create violin plot visualization
 */
function createViolinPlot(container, baseLayout) {
    const years = Object.keys(DASHBOARD_DATA.costs);
    const allCosts = {
        infant: [],
        toddler: [],
        preschool: []
    };
    
    // Collect costs across all years
    years.forEach(year => {
        allCosts.infant.push(...DASHBOARD_DATA.costs[year].infant);
        allCosts.toddler.push(...DASHBOARD_DATA.costs[year].toddler);
        allCosts.preschool.push(...DASHBOARD_DATA.costs[year].preschool);
    });
    
    const traces = [
        {
            type: 'violin',
            y: allCosts.infant,
            name: 'Infant Care',
            box: {
                visible: true
            },
            meanline: {
                visible: true
            },
            line: {
                color: '#FF6B6B'
            }
        },
        {
            type: 'violin',
            y: allCosts.toddler,
            name: 'Toddler Care',
            box: {
                visible: true
            },
            meanline: {
                visible: true
            },
            line: {
                color: '#4ECDC4'
            }
        },
        {
            type: 'violin',
            y: allCosts.preschool,
            name: 'Preschool Care',
            box: {
                visible: true
            },
            meanline: {
                visible: true
            },
            line: {
                color: '#45B7D1'
            }
        }
    ];
    
    const layout = {
        ...baseLayout,
        title: 'Distribution of Childcare Costs by Type (2008-2018)',
        yaxis: {
            title: 'Monthly Cost ($)',
            zeroline: false
        },
        violinmode: 'group',
        showlegend: true,
        legend: {
            orientation: 'h',
            y: -0.2,
            x: 0.5,
            xanchor: 'center'
        }
    };
    
    Plotly.newPlot(container.id, traces, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating violin plot:', err);
            container.innerHTML = '<div class="error">Error creating violin plot visualization</div>';
        });
}

/**
 * Create labor force map visualization
 */
function createLaborForceMap(container, year, baseLayout) {
    const metrics = DASHBOARD_DATA.metrics[year];
    const locations = DASHBOARD_DATA.states;
    const z = metrics.working_parent_ratio.map(ratio => ratio * 100);
    
    const text = locations.map((state, i) => {
        const ratio = z[i];
        const burden = metrics.cost_burden[i];
        const annualCost = metrics.annual_cost[i];
        return `<b>${STATE_NAMES[state]}</b><br>` +
               `Working Parents: ${ratio.toFixed(1)}%<br>` +
               `Cost Burden: ${(burden * 100).toFixed(1)}%<br>` +
               `Annual Cost: $${annualCost.toLocaleString()}`;
    });
    
    const data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: locations,
        z: z,
        text: text,
        hoverinfo: 'text',
        colorscale: 'Viridis',
        colorbar: {
            title: 'Working Parents (%)',
            thickness: 20,
            tickformat: '.1f'
        },
        marker: {
            line: {
                color: 'rgb(255,255,255)',
                width: 2
            }
        }
    }];
    
    const layout = {
        ...baseLayout,
        title: {
            text: `Female Labor Force Participation by State (${year})`,
            font: { size: 24 }
        },
        geo: {
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)',
            projection: {
                type: 'albers usa'
            }
        },
        margin: {
            l: 0,
            r: 0,
            t: 50,
            b: 0
        }
    };
    
    Plotly.newPlot(container.id, data, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating labor force map:', err);
            container.innerHTML = '<div class="error">Error creating labor force map visualization</div>';
        });
}

/**
 * Create spiral plot visualization
 */
function createSpiralPlot(container, baseLayout) {
    const years = Array.from({length: 11}, (_, i) => 2008 + i);
    
    // Calculate average cost for each year
    const yearlyData = years.map(year => {
        const yearCosts = DASHBOARD_DATA.states.map((_, stateIndex) => {
            const yearData = DASHBOARD_DATA.costs[year.toString()];
            if (!yearData) return null;
            const costs = [yearData.infant[stateIndex], yearData.toddler[stateIndex], yearData.preschool[stateIndex]];
            return costs.reduce((a, b) => a + b, 0) / costs.length;
        }).filter(cost => cost !== null);
        
        const avgCost = yearCosts.length > 0 ? 
            Math.round(yearCosts.reduce((a, b) => a + b, 0) / yearCosts.length * 100) : null;
        
        return {
            year: year,
            cost: avgCost
        };
    });

    // Create spiral coordinates
    const theta = Array.from({length: 360}, (_, i) => i * Math.PI / 180);
    const r = theta.map(t => t * 0.5);
    const x = r.map((r, i) => r * Math.cos(theta[i]));
    const y = r.map((r, i) => r * Math.sin(theta[i]));

    const trace = {
        x: x,
        y: y,
        mode: 'lines+markers+text',
        line: {
            color: '#FF69B4',
            width: 3
        },
        marker: {
            size: 10,
            color: '#FF69B4'
        },
        text: years.map(year => year.toString()),
        textposition: 'top center',
        hovertemplate: 'Year: %{text}<br>Cost: $%{customdata:,.0f}<extra></extra>',
        customdata: yearlyData.map(d => d.cost)
    };

    const layout = {
        ...baseLayout,
        title: {
            text: 'Childcare Cost Trends (Spiral View)',
            font: {
                size: 28,
                weight: 'bold'
            }
        },
        showlegend: false,
        xaxis: {
            showgrid: true,
            zeroline: false,
            showticklabels: false
        },
        yaxis: {
            showgrid: true,
            zeroline: false,
            showticklabels: false
        },
        annotations: years.map((year, i) => ({
            x: x[i * 30],
            y: y[i * 30],
            text: year.toString(),
            showarrow: false,
            font: {
                size: 14,
                weight: 'bold'
            }
        }))
    };

    Plotly.newPlot(container, [trace], layout, {responsive: true});
}

/**
 * Create correlation analysis visualization
 */
function createCorrelationAnalysis(container, year, baseLayout) {
    const metrics = {
        'Annual Cost': DASHBOARD_DATA.metrics[year].annual_cost,
        'Cost Burden': DASHBOARD_DATA.metrics[year].cost_burden.map(x => x * 100),
        'Working Parents': DASHBOARD_DATA.metrics[year].working_parent_ratio.map(x => x * 100)
    };

    // Calculate correlation matrix
    const correlationMatrix = {};
    Object.keys(metrics).forEach(metric1 => {
        correlationMatrix[metric1] = {};
        Object.keys(metrics).forEach(metric2 => {
            const correlation = calculateCorrelation(metrics[metric1], metrics[metric2]);
            correlationMatrix[metric1][metric2] = correlation;
        });
    });

    // Convert correlation matrix to plotly format
    const data = [{
        type: 'heatmap',
        z: Object.values(correlationMatrix).map(row => Object.values(row)),
        x: Object.keys(metrics),
        y: Object.keys(metrics),
        colorscale: 'RdBu',
        zmin: -1,
        zmax: 1,
        text: Object.values(correlationMatrix).map(row => 
            Object.values(row).map(val => val.toFixed(2))
        ),
        hoverongaps: false
    }];

    const layout = {
        ...baseLayout,
        title: 'Correlation Analysis of Key Metrics',
        width: 600,
        height: 600
    };

    Plotly.newPlot(container.id, data, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating correlation analysis:', err);
            container.innerHTML = '<div class="error">Error creating correlation analysis</div>';
        });
}

/**
 * Calculate correlation between two arrays
 */
function calculateCorrelation(x, y) {
    const n = x.length;
    const mean_x = x.reduce((a, b) => a + b) / n;
    const mean_y = y.reduce((a, b) => a + b) / n;
    
    const cov = x.map((xi, i) => (xi - mean_x) * (y[i] - mean_y))
                 .reduce((a, b) => a + b) / (n - 1);
    
    const var_x = x.map(xi => Math.pow(xi - mean_x, 2))
                   .reduce((a, b) => a + b) / (n - 1);
    const var_y = y.map(yi => Math.pow(yi - mean_y, 2))
                   .reduce((a, b) => a + b) / (n - 1);
    
    return cov / Math.sqrt(var_x * var_y);
}

/**
 * Create social media impact visualization
 */
    // First correlation: Cost vs Income
    const trace1 = {
        x: DASHBOARD_DATA.metrics['2018'].annual_cost,
        y: DASHBOARD_DATA.metrics['2018'].median_income,
        mode: 'markers',
        type: 'scatter',
        name: 'Cost vs Income',
        marker: {
            size: 12,
            color: DASHBOARD_DATA.metrics['2018'].cost_burden.map(v => v * 100),
            colorscale: 'Viridis',
            showscale: true,
            colorbar: {
                title: 'Cost Burden (%)'
            }
        },
        text: DASHBOARD_DATA.states.map((state, i) => 
            `${STATE_NAMES[state]}<br>` +
            `Annual Cost: $${DASHBOARD_DATA.metrics['2018'].annual_cost[i].toLocaleString()}<br>` +
            `Median Income: $${DASHBOARD_DATA.metrics['2018'].median_income[i].toLocaleString()}`
        ),
        xaxis: 'x1',
        yaxis: 'y1'
    };

    // Second correlation: Working Parents vs Cost Burden
    const trace2 = {
        x: DASHBOARD_DATA.metrics['2018'].working_parent_ratio.map(v => v * 100),
        y: DASHBOARD_DATA.metrics['2018'].cost_burden.map(v => v * 100),
        mode: 'markers',
        type: 'scatter',
        name: 'Working Parents vs Cost',
        marker: {
            size: 12,
            color: DASHBOARD_DATA.metrics['2018'].annual_cost,
            colorscale: 'Viridis',
            showscale: true,
            colorbar: {
                title: 'Annual Cost ($)'
            }
        },
        text: DASHBOARD_DATA.states.map((state, i) => 
            `${STATE_NAMES[state]}<br>` +
            `Working Parents: ${(DASHBOARD_DATA.metrics['2018'].working_parent_ratio[i] * 100).toFixed(1)}%<br>` +
            `Cost Burden: ${(DASHBOARD_DATA.metrics['2018'].cost_burden[i] * 100).toFixed(1)}%`
        ),
        xaxis: 'x2',
        yaxis: 'y2'
    };

    layout.xaxis1 = {
        title: 'Annual Cost ($)',
        domain: [0, 0.45]
    };
    layout.yaxis1 = {
        title: 'Median Income ($)'
    };
    layout.xaxis2 = {
        title: 'Working Parents (%)',
        domain: [0.55, 1]
    };
    layout.yaxis2 = {
        title: 'Cost Burden (%)'
    };

    Plotly.newPlot(container, [trace1, trace2], layout, {responsive: true});
}

/**
 * Create social media impact visualization
 */
function createSocialMediaImpact(container, baseLayout) {
    const platforms = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'];
    const metrics = ['Engagement Rate', 'Reach', 'Shares', 'Comments'];
    const months = Array.from({length: 12}, (_, i) => i + 1);
    
    // Generate social media data
    const data = [];
    platforms.forEach(platform => {
        metrics.forEach(metric => {
            const baseValue = Math.random() * 4000 + 1000;
            months.forEach(month => {
                const value = baseValue * (1 + Math.random() * 0.5 - 0.2);
                data.push({
                    Platform: platform,
                    Metric: metric,
                    Month: month,
                    Value: value
                });
            });
        });
    });

    // Create subplot layout
    const layout = {
        ...baseLayout,
        grid: {rows: 2, columns: 1, pattern: 'independent'},
        height: container.clientHeight * 1.8,
        title: 'Social Media Impact Analysis',
        showlegend: true
    };

    // First subplot: Line chart showing engagement trends
    const traces1 = platforms.map(platform => ({
        type: 'scatter',
        x: months,
        y: data.filter(d => d.Platform === platform && d.Metric === 'Engagement Rate')
            .map(d => d.Value),
        name: platform,
        mode: 'lines+markers',
        xaxis: 'x1',
        yaxis: 'y1'
    }));

    // Second subplot: Heatmap showing metrics comparison
    const pivotData = {};
    platforms.forEach(platform => {
        pivotData[platform] = {};
        metrics.forEach(metric => {
            pivotData[platform][metric] = data
                .filter(d => d.Platform === platform && d.Metric === metric)
                .reduce((sum, d) => sum + d.Value, 0) / 12;
        });
    });
    
    const trace2 = {
        type: 'heatmap',
        x: metrics,
        y: platforms,
        z: platforms.map(platform => 
            metrics.map(metric => pivotData[platform][metric])
        ),
        xaxis: 'x2',
        yaxis: 'y2',
        colorscale: 'Viridis',
        colorbar: {
            title: 'Average Value',
            y: 0.15,
            len: 0.3
        }
    };

    layout.xaxis1 = {
        title: 'Month',
        domain: [0, 0.95],
        tickmode: 'array',
        ticktext: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        tickvals: months
    };
    layout.yaxis1 = {
        title: 'Engagement Rate',
        domain: [0.55, 1]
    };
    layout.xaxis2 = {
        title: 'Metrics',
        domain: [0, 0.95]
    };
    layout.yaxis2 = {
        title: 'Platforms',
        domain: [0, 0.35]
    };

    const allTraces = [...traces1, trace2];
    
    Plotly.newPlot(container.id, allTraces, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating social media impact visualization:', err);
            container.innerHTML = '<div class="error">Error creating social media visualization</div>';
        });
}

/**
 * Create cost distribution visualization
 */
function createCostDistribution(container, year, baseLayout) {
    const data = [{
        type: 'violin',
        x: DASHBOARD_DATA.states,
        y: DASHBOARD_DATA.metrics[year].annual_cost,
        points: 'all',
        box: {
            visible: true
        },
        line: {
            color: 'blue'
        },
        meanline: {
            visible: true
        }
    }];

    const layout = {
        ...baseLayout,
        title: 'Distribution of Annual Childcare Costs by State',
        xaxis: {
            title: 'States'
        },
        yaxis: {
            title: 'Annual Cost ($)',
            zeroline: false
        }
    };

    Plotly.newPlot(container.id, data, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating cost distribution:', err);
            container.innerHTML = '<div class="error">Error creating cost distribution visualization</div>';
        });
}

/**
 * Create regional cost trends visualization
 */
function createCostTrends(container, year, baseLayout) {
    // Get state costs for the selected year
    const stateCosts = DASHBOARD_DATA.states.map((state, index) => {
        const yearData = DASHBOARD_DATA.costs[year];
        const costs = [yearData.infant[index], yearData.toddler[index], yearData.preschool[index]];
        return {
            state: state,
            cost: Math.round(costs.reduce((a, b) => a + b, 0) / costs.length * 100),
            stdDev: Math.round(Math.sqrt(
                costs.reduce((acc, val) => acc + Math.pow(val - costs.reduce((a, b) => a + b, 0) / costs.length, 2), 0) / costs.length
            ) * 100)
        };
    });

    // Sort by cost descending
    stateCosts.sort((a, b) => b.cost - a.cost);

    const trace = {
        y: stateCosts.map(d => d.state),
        x: stateCosts.map(d => d.cost),
        error_x: {
            type: 'data',
            array: stateCosts.map(d => d.stdDev),
            color: '#444',
            thickness: 1.5,
            width: 3
        },
        type: 'bar',
        orientation: 'h',
        marker: {
            color: stateCosts.map(d => d.cost),
            colorscale: 'Viridis',
            showscale: true,
            colorbar: {
                title: {
                    text: 'Annual Cost ($)',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        },
        text: stateCosts.map(d => `$${d.cost.toLocaleString()}`),
        textposition: 'outside',
        hovertemplate: '%{y}: $%{x:,.0f}<br>Std Dev: $%{error_x.array:,.0f}<extra></extra>'
    };

    const layout = {
        ...baseLayout,
        title: {
            text: 'Average Childcare Costs by State (2008-2018)\nwith Standard Deviation',
            font: {
                size: 28,
                weight: 'bold'
            }
        },
        xaxis: {
            title: {
                text: 'Average Annual Cost ($)',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tickformat: '$,.0f',
            showgrid: true,
            gridcolor: '#E5E5E5'
        },
        yaxis: {
            title: {
                text: 'State',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            automargin: true
        },
        margin: {
            l: 80,
            r: 150,
            t: 100,
            b: 80
        },
        showlegend: false,
        height: 1200  // Increased height to accommodate all states
    };

    Plotly.newPlot(container, [trace], layout, {responsive: true});
}

/**
 * Update visualization based on selected type and year
 */
function updateVisualization() {
    const container = document.getElementById('mainVisualization');
    const visualType = document.getElementById('visualizationType').value;
    const selectedYear = document.getElementById('yearFilter').value;
    
    // Clear previous content
    container.innerHTML = '';
    
    // Base layout for all visualizations
    const baseLayout = {
        margin: { l: 50, r: 50, t: 50, b: 50 },
        font: { family: 'Arial, sans-serif' }
    };
    
    try {
        switch(visualType) {
            case 'geoChoropleth':
                createHeatMap(container, selectedYear, baseLayout);
                break;
            case 'timeSeriesAnalysis':
                createTimeSeries(container, selectedYear, baseLayout);
                break;
            case 'workingParentsBurden':
                createWorkingParentsBurden(container, selectedYear, baseLayout);
                break;
            case 'costDistribution':
                createCostDistribution(container, selectedYear, baseLayout);
                break;
            case 'correlation':
                createCorrelationAnalysis(container, selectedYear, baseLayout);
                break;
            default:
                container.innerHTML = '<div class="error">Invalid visualization type selected</div>';
        }
    } catch (error) {
        console.error('Error updating visualization:', error);
        container.innerHTML = `<div class="error">Error creating visualization: ${error.message}</div>`;
    }
}

/**
 * Create working parents burden visualization
 */
function createWorkingParentsBurden(container, year, baseLayout) {
    const data = [];
    
    // Scatter plot of working parent ratio vs cost burden
    data.push({
        type: 'scatter',
        mode: 'markers',
        x: DASHBOARD_DATA.metrics[year].working_parent_ratio.map(x => x * 100),
        y: DASHBOARD_DATA.metrics[year].cost_burden.map(x => x * 100),
        text: DASHBOARD_DATA.states.map((state, i) => 
            `${STATE_NAMES[state]}<br>` +
            `Working Parents: ${(DASHBOARD_DATA.metrics[year].working_parent_ratio[i] * 100).toFixed(1)}%<br>` +
            `Cost Burden: ${(DASHBOARD_DATA.metrics[year].cost_burden[i] * 100).toFixed(1)}%<br>` +
            `Annual Cost: $${DASHBOARD_DATA.metrics[year].annual_cost[i].toFixed(2)}`
        ),
        marker: {
            size: 12,
            color: DASHBOARD_DATA.metrics[year].annual_cost,
            colorscale: 'Viridis',
            showscale: true,
            colorbar: {
                title: 'Annual Cost ($)'
            }
        },
        hoverinfo: 'text'
    });

    const layout = {
        ...baseLayout,
        title: 'Working Parents Ratio vs Cost Burden',
        xaxis: {
            title: 'Working Parents Ratio (%)',
            zeroline: false
        },
        yaxis: {
            title: 'Cost Burden (%)',
            zeroline: false
        },
        showlegend: false
    };

    Plotly.newPlot(container.id, data, layout, {responsive: true})
        .catch(err => {
            console.error('Error creating working parents burden visualization:', err);
            container.innerHTML = '<div class="error">Error creating working parents burden visualization</div>';
        });
}

/**
 * Export data to CSV format
 */
function exportDataToCSV() {
    const dataType = document.getElementById('dataType').value;
    const costs = DASHBOARD_DATA.costs[dataType];
    const states = DASHBOARD_DATA.states;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "State,State Name,Monthly Cost\n";
    
    states.forEach((state, index) => {
        const row = [
            state,
            STATE_NAMES[state],
            costs[index].toFixed(2)
        ].join(",");
        csvContent += row + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `childcare_${dataType}_costs.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showStatus('Data exported successfully', 'success');
}

/**
 * Initialize dashboard
 */
function initDashboard() {
    const visualTypeSelect = document.getElementById('visualizationType');
    const yearFilter = document.getElementById('yearFilter');
    
    function updateYearFilterVisibility() {
        if (timeBasedVisualizations.includes(visualTypeSelect.value)) {
            yearFilter.classList.add('visible');
        } else {
            yearFilter.classList.remove('visible');
        }
    }
    
    visualTypeSelect.addEventListener('change', function() {
        updateYearFilterVisibility();
    updateVisualization();
    });
    
    yearFilter.addEventListener('change', updateVisualization);
    
    // Initial setup
    updateYearFilterVisibility();
    updateVisualization();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing dashboard...");
    try {
        initDashboard();
    } catch (error) {
        console.error("Error initializing dashboard:", error);
        showStatus('Error initializing dashboard: ' + error.message, 'error');
    }
}); 

// Update window resize handler
window.addEventListener('resize', () => {
    const container = document.getElementById('mainVisualization');
    if (container) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const headerHeight = 120;
        const marginBottom = 20;
        const marginSides = 40;
        
        container.style.width = `${viewportWidth - marginSides}px`;
        container.style.height = `${Math.min(800, Math.max(400, viewportHeight - headerHeight - marginBottom))}px`;
        container.style.maxWidth = '2000px';
        
        Plotly.Plots.resize(container);
    }
}); 