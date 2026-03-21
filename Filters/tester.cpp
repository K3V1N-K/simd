#include "./adjustBrightness.hpp"
#include "./adjustBrightnessSimd.hpp"

#include <iostream>
#include <chrono>

int main()
{
    std::cout << "Starting test" << '\n';
    
    const unsigned  int x = 192;
    const unsigned  int y = 1080;

    std::vector<char> refImage(x * y);

    for (unsigned  int i = 0; i < x * y; i++)
    {
        refImage[i] = 100;
    }

    std::cout << "starting non simd test" << '\n';
    clock_t reg_start = clock();

    adjustBrightness(refImage.data(), x, y, 25);

    clock_t reg_end = clock();
    double reg_time = 0.0;
    reg_time = reg_time + (double)(reg_end - reg_start);
    reg_time = reg_time / CLOCKS_PER_SEC;

    std::cout << "starting simd test" << '\n';

    clock_t simd_start = clock();
    adjustBrightnessSimd(refImage.data(), x, y, 25);
    clock_t simd_end = clock();
    double simd_time = 0.0;
    simd_time = simd_time + (double)(simd_end - simd_start);
    simd_time = simd_time / CLOCKS_PER_SEC;

    std::cout << " \n\n\n END OF TEST \n\n\n ";

    std::cout << "non simd finished in " << reg_time << " sec" << '\n';
    std::cout << "simd finished in " << simd_time << " sec" << '\n';

    ;
}
