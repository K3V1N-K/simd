#include "./adjustBrightness.hpp"
#include <iostream>

int main()
{
    std::cout << "Starting test" << '\n';
    ;
    std::vector<char> refImage(192000 * 10800);

    for (int i = 0; i < 1920 * 10800; i++)
    {
        refImage[i] = 100;
    }
    std::cout << refImage[0] << '\n';

    adjustBrightness(refImage.data(), 1920, 10800, 1.5);

    std::cout << refImage[0] << '\n';

    std::cout << "Starting Finished" << '\n';
    ;
}
