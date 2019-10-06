from setuptools import find_packages, setup

setup(
    name='test_automation',
    version='2.0.0',
    description='Test Automation:Server',
    long_description=open('README.md').read().strip(),
    author='Nick Lalic',
    author_email='nick.lalic@gmail.com',
    url='http://path-to-my-packagename',
    py_modules=['test_automation'],
    packages=find_packages(exclude=['test']),
    package_data={'': ['*.yaml']},
    include_package_data=True,
    install_requires=['instrument-server>=1.1.1<2.0', 'rohdeschwarz'],
    extras_require={
    'dev':  ['ddt>=1.2.0<2.0'],
    'test': ['ddt>=1.2.0<2.0']
    },
    license='MIT License',
    zip_safe=False,
    keywords='RF test instrument SCPI',
    classifiers=['Packages', 'RF'],
    entry_points= {
        'console_scripts': [
            'test-automation=test_automation.bin.test_automation:main'
        ]
    }
)
