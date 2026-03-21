
#include <iostream>
#include <chrono>

#include <vector>
#include <stdio.h>
#include <smmintrin.h>
#include <immintrin.h>
#include <time.h>
#include <stdlib.h>
#pragma GCC target("avx2")

#include <iostream>

void adjustBrightnessSimd(char image1[], int imageWidth, int imageHeight, char modif)
{
    __m256i simdA;
    __m256i simdB;
    __m256i res;
    char buffer[32];

    simdB = _mm256_set_epi8(modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif, modif);

    unsigned int i;
    for (i = 0; i < (imageWidth * imageHeight) - 32; i += 32)
    {
        simdA = _mm256_set_epi8(image1[i], image1[i + 1], image1[i + 2], image1[i + 3], image1[i + 4], image1[i + 5], image1[i + 6], image1[i + 7], image1[i + 8], image1[i + 9], image1[i + 10], image1[i + 11], image1[i + 12], image1[i + 13], image1[i + 14], image1[i + 15], image1[i + 16], image1[i + 17], image1[i + 18], image1[i + 19], image1[i + 20], image1[i + 21], image1[i + 22], image1[i + 23], image1[i + 24], image1[i + 25], image1[i + 26], image1[i + 27], image1[i + 28], image1[i + 29], image1[i + 30], image1[i + 31]);
        res = _mm256_add_epi8(simdA, simdB);

        _mm256_storeu_si256((__m256i *)buffer, res);
        memcpy(buffer, &image1[i], sizeof(char) * 32);
        if (i % 100 == 0)
        {
            std::system("cls");
            std::cout << (0.0 + i) / (imageWidth * imageHeight) * 100 << '%';
        }
    }
    for (; i < imageWidth * imageHeight; i++)
    {
        char newPixelValue = image1[i] + modif;
        if (i % 100 == 0)
            std::cout << '.';
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
    std::cout << "starting simd test" << '\n';

    clock_t simd_start = clock();
    adjustBrightnessSimd(refImage.data(), x, y, 25);
    clock_t simd_end = clock();
    double simd_time = 0.0;
    simd_time = simd_time + (double)(simd_end - simd_start);
    simd_time = simd_time / CLOCKS_PER_SEC;

    std::cout << " \n\n\n END OF TEST \n\n\n ";

    std::cout << "simd finished in " << simd_time << " sec" << '\n';

    ;
}
