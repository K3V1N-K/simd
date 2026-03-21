
#include <iostream>
#include <chrono>

void adjustBrightness(char image1[], int imageWidth, int imageHeight, char modif)
{

    for (unsigned int i = 0; i < imageWidth * imageHeight; i++)
    {
        char newPixelValue = image1[i] + modif;
        // std::cout << static_cast<int>(newPixelValue) << " ";
        if (i % 100 == 0)
        {
            std::system("cls");
            std::cout << (0.0 + i) / (imageWidth * imageHeight) * 100 << '%';
        }
        image1[i] = newPixelValue;
    }
}

int main()
{
    std::cout << "Starting test" << '\n';

    const unsigned int x = 192;
    const unsigned int y = 1080;

    std::vector<char> refImage(x * y);

    for (unsigned int i = 0; i < x * y; i++)
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

    std::cout << " \n\n\n END OF TEST \n\n\n ";

    std::cout << "non simd finished in " << reg_time << " sec" << '\n';
}
