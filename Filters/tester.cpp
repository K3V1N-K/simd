#include "./adjustBrightness.hpp"
#include "./adjustBrightnessSimd.hpp"

#include <iostream>
#include <chrono>

int main()
{
    std::cout << "Starting test" << '\n';
    
    const int x = 40000;
    const int y = 40000;

    std::vector<char> refImage(x * y);

    for (int i = 0; i < x * y; i++)
    {
        refImage[i] = 100;
    }
    std::cout << refImage[0] << '\n';

    std::cout << "starting non simd test" << '\n';
    clock_t reg_start = clock();

    adjustBrightness(refImage.data(), x, y, 25);

    clock_t reg_end = clock();
    double reg_time = 0.0;
    reg_time = reg_time + (double)(reg_end - reg_start);
    reg_time = reg_time / CLOCKS_PER_SEC;
    std::cout << "finished in " << reg_time << " sec" << '\n';


    std::cout << "starting simd test" << '\n';

    clock_t simd_start = clock();
    adjustBrightnessSimd(refImage.data(), x, y, 25);
    clock_t simd_end = clock();
    double simd_time = 0.0;
    simd_time = simd_time + (double)(simd_end - simd_start);
    simd_time = simd_time / CLOCKS_PER_SEC;
    std::cout << "finished in " << simd_time << " sec" << '\n';


    std::cout << refImage[0] << '\n';

    std::cout << "Starting Finished" << '\n';
    ;
}
