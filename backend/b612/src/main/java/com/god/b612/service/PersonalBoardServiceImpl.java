package com.god.b612.service;

import com.god.b612.dto.PersonalBoardRequestDto;
import com.god.b612.dto.PersonalBoardResponseDto;
import com.god.b612.entity.Member;
import com.god.b612.entity.PersonalBoard;
import com.god.b612.repository.PersonalBoardRepository;
import com.god.b612.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonalBoardServiceImpl implements PersonalBoardService {
    @Autowired
    private final MemberRepository memberRepository;
    @Autowired
    private final PersonalBoardRepository personalBoardRepository;

    @Override
    public PersonalBoard registPersonalBoard(PersonalBoardRequestDto.Create personalBoardRequestDto, int ownerId, int writerId) {
        Member owner = memberRepository.findMemberByMemberId(ownerId);
        Member writer = memberRepository.findMemberByMemberId(writerId);
        PersonalBoard personalBoard = PersonalBoard.builder()
                .personalBoardWriterId(writer)
                .personalBoardOwnerId(owner)
                .personalBoardContent(personalBoardRequestDto.getPersonalBoardContent())
                .build();
        return personalBoardRepository.save(personalBoard);
    }

    @Override
    public PersonalBoardResponseDto personalBoardSelectById(int personalBoardId) {
        PersonalBoardResponseDto personalBoardResponseDto = PersonalBoardResponseDto.of(personalBoardRepository.findById(personalBoardId).get());
        return personalBoardResponseDto;
    }

    @Override
    public PersonalBoardResponseDto updatePersonalBoard(PersonalBoardRequestDto.Update personalBoardRequestDto) {

        PersonalBoard personalBoard = personalBoardRepository.findById(personalBoardRequestDto.getPersonalBoardId()).get();
        Member writer = memberRepository.findMemberByMemberId(personalBoard.getPersonalBoardWriterId().getMemberId());

        PersonalBoard changedPersonalBoard = PersonalBoard.builder()
                .personalBoardId(personalBoardRequestDto.getPersonalBoardId())
                .personalBoardWriterId(writer)
                .personalBoardOwnerId(personalBoard.getPersonalBoardOwnerId())
                .personalBoardContent(personalBoardRequestDto.getPersonalBoardContent())
                .build();

        return PersonalBoardResponseDto.of(personalBoardRepository.save(changedPersonalBoard));

    }

    @Override
    public void deletePersonalBoard(int personalBoardId) {
        personalBoardRepository.deleteById(personalBoardId);
    }

    @Override
    public Page<PersonalBoardResponseDto> findAll(Pageable pageable) {
        Page<PersonalBoardResponseDto> ret = personalBoardRepository.findAllByOrderByCreatedTimeDesc(pageable).map(PersonalBoardResponseDto::from);
        return ret;
    }
}
